<script setup>
import { ref, onMounted } from 'vue'
import api from '../../api'
import { useAuth } from '../../stores/auth'

const { user, token } = useAuth()
const balance = ref(null)

onMounted(async () => {
  try {
    const res = await api.get('/transactions')
    balance.value = res.data.balance
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <div>
    <div class="card mb-4">
      <div class="card-body">
        <h4>Welcome, {{ user?.name }}</h4>
        <p>Email: {{ user?.email }}</p>
        <p><strong>Balance:</strong> {{ balance ?? 'Loading...' }}</p>
        <p><small class="text-muted">Token: {{ token?.slice(0, 15) }}...</small></p>
      </div>
    </div>

    <div class="d-flex gap-2">
      <router-link to="/transactions" class="btn btn-outline-primary">View Transactions</router-link>
      <router-link to="/transfer" class="btn btn-success">Make Transfer</router-link>
    </div>
  </div>
</template>
