<script setup>
import { ref, onMounted } from 'vue'
import api from '../../api'

const transactions = ref([])
const balance = ref(null)

const load = async () => {
  const res = await api.get('/transactions')
  transactions.value = res.data.transactions.data
  balance.value = res.data.balance
}

onMounted(load)
</script>

<template>
  <div>
    <h4>Transactions</h4>
    <p><strong>Balance:</strong> {{ balance }}</p>

    <table class="table table-bordered mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>Amount</th>
          <th>Commission</th>
          <th>Total Debited</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in transactions" :key="t.id">
          <td>{{ t.id }}</td>
          <td>{{ t.sender?.name }}</td>
          <td>{{ t.receiver?.name }}</td>
          <td>{{ t.amount }}</td>
          <td>{{ t.commission_fee }}</td>
          <td>{{ t.total_debited }}</td>
          <td>{{ new Date(t.created_at).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
