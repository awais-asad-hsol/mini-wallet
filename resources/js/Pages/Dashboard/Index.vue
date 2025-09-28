```vue
<template>
  <div>
    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <h4 class="mb-3">Welcome, {{ user?.name }}</h4>
        <p><strong>Email:</strong> {{ user?.email }}</p>
        <p><strong>Joined:</strong> {{ new Date(user?.created_at).toLocaleDateString() }}</p>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card text-bg-primary shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Balance</h5>
            <p class="fs-4">💰 {{ balance ?? 'Loading...' }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card text-bg-success shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Total Transactions</h5>
            <p class="fs-4">🔄 {{ stats.totalTransactions }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card text-bg-warning shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Commission Paid</h5>
            <p class="fs-4">💸 {{ stats.totalCommission }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useAuth } from '../../stores/auth'
  import { useTransactions } from '../../stores/transactions'
  import { fetchTransactions, initTransactionRealtime } from '../../services/transaction.js'


  const { user } = useAuth()

  const { list, balance, stats } = useTransactions()

  onMounted(async () => {
    await fetchTransactions();
    initTransactionRealtime() ;
  })
</script>