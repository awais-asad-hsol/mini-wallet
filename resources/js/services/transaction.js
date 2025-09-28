// services/transaction.js
import api from '../api'
import echo from '../echo'
import { useAuth } from '../stores/auth'
import { useTransactions } from '../stores/transactions'

export async function fetchTransactions(params = {}) {
  const res = await api.get('/transactions', { params })
  const transactionsStore = useTransactions()

  transactionsStore.setTransactions(res.data.transactions.data)
  transactionsStore.setBalance(res.data.balance)
  transactionsStore.setStats(res.data.stats)

  return res.data
}

export async function makeTransfer(payload) {
  const res = await api.post('/transactions', payload)
  const transactionsStore = useTransactions()
  const { user } = useAuth()

  if (user.value) {
    console.log(`Updating sender dashboard instantly for user ${user.value.id}`)
    transactionsStore.addTransaction(res.data.transaction)
    transactionsStore.updateBalance(res.data.transaction, user.value.id)
    transactionsStore.incrementStats(res.data.transaction, user.value.id)
  }

  return res.data
}

export function initTransactionRealtime() {
  const { user } = useAuth()
  const transactionsStore = useTransactions()

  if (!user.value) return

  console.log(`Subscribing to private-user.${user.value.id}`)
  echo.private(`user.${user.value.id}`)
    .listen('.TransactionCreated', (e) => {
      console.log('Realtime transaction event received:', e.transaction)
      transactionsStore.addTransaction(e.transaction)
      transactionsStore.updateBalance(e.transaction, user.value.id)
      transactionsStore.incrementStats(e.transaction, user.value.id)
    })
}
