import axios from 'axios'
import router from './router'
import { useAuth } from './stores/auth'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 419)) {
      const { clearAuth } = useAuth()
      clearAuth()
      router.push('/login') 
    }
    return Promise.reject(error)
  }
)

export default api
