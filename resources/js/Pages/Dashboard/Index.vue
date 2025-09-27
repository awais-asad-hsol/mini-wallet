<template>
  <div>
    <!-- 👤 User Details Card -->
    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <h4 class="mb-3">Welcome, {{ user?.name }}</h4>
        <p><strong>Email:</strong> {{ user?.email }}</p>
        <p><strong>Joined:</strong> {{ new Date(user?.created_at).toLocaleDateString() }}</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row">
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
  import { ref, onMounted } from 'vue'
  import api from '../../api'
  import { useAuth } from '../../stores/auth'

  const { user } = useAuth()

  const balance = ref(null)
  const stats = ref({ totalTransactions: 0, totalCommission: 0 })

  onMounted(async () => {
    try {
      const res = await api.get('/transactions')
      balance.value = res.data.balance
      stats.value = res.data.stats
    } catch (e) {
      console.error(e)
    }
  })
</script>
