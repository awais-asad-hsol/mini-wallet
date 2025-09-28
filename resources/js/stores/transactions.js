// stores/transactions.js
import { ref } from 'vue'

const list = ref([])
const balance = ref(0)
const stats = ref({ totalTransactions: 0, totalCommission: 0 })

export function useTransactions() {
  const setTransactions = (transactions) => { list.value = transactions }
  const addTransaction = (transaction) => { list.value.unshift(transaction) }

  const updateBalance = (transaction, userId) => {
    if (transaction.sender_id === userId) {
      balance.value -= transaction.total_debited
      stats.value.totalCommission += transaction.commission_fee
    }
    if (transaction.receiver_id === userId) {
      balance.value += transaction.amount
    }
  }

  const setBalance = (val) => { balance.value = val }
  const setStats = (val) => { stats.value = val }

  // Increment counters when a new transaction arrives
  const incrementStats = (transaction, userId) => {
    stats.value.totalTransactions += 1

    if (transaction.sender_id === userId) {
      stats.value.totalCommission += transaction.commission_fee
    }
  }

  return {
    list,
    balance,
    stats,
    setTransactions,
    addTransaction,
    updateBalance,
    setBalance,
    setStats,
    incrementStats,
  }
}
