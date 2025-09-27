<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow-sm">
        <div class="card-body">
          <h4 class="mb-3">Register</h4>
          <form @submit.prevent="submit">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input v-model="name" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="email" type="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input v-model="password" type="password" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Confirm Password</label>
              <input v-model="password_confirmation" type="password" class="form-control" required />
            </div>
            <button class="btn btn-success w-100">Register</button>
          </form>

          <div v-if="errors" class="mt-3 alert alert-danger">
            <div v-for="(msg, field) in errors" :key="field">{{ msg[0] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import api from '../../api';
  import { useAuth } from '../../stores/auth'
  const { setAuth } = useAuth()


  const name = ref('');
  const email = ref('');
  const password = ref('');
  const password_confirmation = ref('');
  const errors = ref(null);
  const router = useRouter();

  const submit = async () => {
    errors.value = null;
    try {
        const res = await api.post('/register', {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
        });
        setAuth(res.data.token, res.data.user)
        router.push('/dashboard');
    } catch (e) {
        errors.value = e.response?.data?.errors ?? { general: ['Registration failed'] };
    }
  };
</script>