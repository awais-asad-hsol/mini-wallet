<template>
    <div>
        <div class="card mb-3 shadow-sm">
        <div class="card-body d-flex justify-content-between align-items-center">
            <h5 class="mb-0">💰 Balance</h5>
            <span class="fs-4 fw-bold text-primary">{{ balance }}</span>
        </div>
        </div>

        <div v-if="loading" class="alert alert-info text-center">
        <div class="spinner-border spinner-border-sm me-2" role="status"></div>
        Loading transactions...
        </div>

        <div v-else-if="transactions.length === 0" class="alert alert-warning text-center">
        ⚠️ No transactions available
        </div>

        <div v-else class="card shadow-sm">
            <div class="card-header bg-primary text-white">
                <h6 class="mb-0">📑 Transactions</h6>
            </div>
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light text-center">
                        <tr>
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
                            <td class="align-middle text-center">{{ t.sender?.name }}</td>
                            <td class="align-middle text-center">{{ t.receiver?.name }}</td>
                            <td class="align-middle text-center">
                            <span class="badge bg-success">+ {{ t.amount }}</span>
                            </td>
                            <td class="align-middle text-center">
                            <span class="badge bg-warning text-dark">{{ t.commission_fee }}</span>
                            </td>
                            <td class="align-middle text-center fw-bold">{{ t.total_debited }}</td>
                            <td class="align-middle text-center">{{ new Date(t.created_at).toLocaleString() }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="card-footer bg-white">
                <nav class="d-flex justify-content-center">
                    <ul class="pagination mb-0">
                        <li class="page-item" :class="{ disabled: !pagination.prev_page_url }">
                        <a class="page-link" href="#" @click.prevent="load(pagination.current_page - 1)">Previous</a>
                        </li>

                        <li
                        v-for="page in pagination.last_page"
                        :key="page"
                        class="page-item"
                        :class="{ active: page === pagination.current_page }"
                        >
                        <a class="page-link" href="#" @click.prevent="load(page)">{{ page }}</a>
                        </li>

                        <li class="page-item" :class="{ disabled: !pagination.next_page_url }">
                        <a class="page-link" href="#" @click.prevent="load(pagination.current_page + 1)">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import api from '../api'

    const props = defineProps({
        type: { type: String, default: null } // "sent" | "received"
    })

    const transactions = ref([])
    const balance = ref(null)
    const loading = ref(true)
    const pagination = ref({})

    const load = async (page = 1) => {
        loading.value = true
        try {
            const res = await api.get('/transactions', {
                params: { ...(props.type ? { type: props.type } : {}), page }
            })

            transactions.value = res.data.transactions.data
            balance.value = res.data.balance

            // Store pagination info
            pagination.value = {
                current_page: res.data.transactions.current_page,
                last_page: res.data.transactions.last_page,
                prev_page_url: res.data.transactions.prev_page_url,
                next_page_url: res.data.transactions.next_page_url,
            }
        } catch (e) {
            console.error(e)
        } finally {
            loading.value = false
        }
    }

    onMounted(() => load())
</script>