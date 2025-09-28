<template>
    <div class="card">
        <div class="card-body">
        <h4>Make a Transfer</h4>
        <form @submit.prevent="submit">
            <div class="mb-3">
            <label class="form-label">Receiver ID</label>
            <input v-model="receiver_id" type="number" class="form-control" required />
            <div v-if="errors?.receiver_id" class="text-danger small">
                {{ errors.receiver_id[0] }}
            </div>
            </div>
            <div class="mb-3">
            <label class="form-label">Amount</label>
            <input v-model="amount" type="number" class="form-control" step="0.01" required />
            <div v-if="errors?.amount" class="text-danger small">
                {{ errors.amount[0] }}
            </div>
            </div>
            <button class="btn btn-success">Send</button>
        </form>

        <div v-if="message" class="alert alert-success mt-3">{{ message }}</div>
        <div v-if="errors?.general" class="alert alert-danger mt-3">
            {{ errors.general[0] }}
        </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue'
    import api from '../../api'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const receiver_id = ref('')
    const amount = ref('')
    const message = ref(null)
    const errors = ref(null)

    const submit = async () => {
        message.value = null
        errors.value = null
        try {
            const res = await api.post('/transactions', {
            receiver_id: receiver_id.value,
            amount: amount.value,
            })
            message.value = res.data.message
            setTimeout(() => router.push('/transactions/sent'), 1000)
        } catch (e) {
            if (e.response?.data?.errors) {
            errors.value = e.response.data.errors
            } else {
            errors.value = { general: [e.response?.data?.error || 'Transaction failed'] }
            }
        }
    }
</script>
