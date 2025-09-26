import { ref, computed } from 'vue'

const token = ref(localStorage.getItem('token'))
const user = ref(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)

export function useAuth() {
    const isAuthenticated = computed(() => !!token.value)

    const setAuth = (newToken, newUser) => {
        token.value = newToken
        user.value = newUser
        localStorage.setItem('token', newToken)
        localStorage.setItem('user', JSON.stringify(newUser))
    }

    const clearAuth = () => {
        token.value = null
        user.value = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    return { token, user, isAuthenticated, setAuth, clearAuth }
}
