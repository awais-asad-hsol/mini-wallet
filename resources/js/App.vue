<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container">
          <a class="navbar-brand" href="/">MiniWallet</a>
  
          <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
              <template v-if="!isAuthenticated">
                <li class="nav-item">
                  <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/register">Register</router-link>
                </li>
              </template>
  
              <template v-else>
                <!-- <li class="nav-item">
                  <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
                </li> -->
                <li class="nav-item">
                  <a href="#" class="nav-link" @click.prevent="logout">Logout</a>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </nav>
  
      <main class="container py-4">
        <router-view />
      </main>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import api from './api'
  import { useAuth } from './stores/auth'
  
  const router = useRouter()
  const { isAuthenticated, clearAuth } = useAuth()
  
  const logout = async () => {
    try {
      await api.post('/logout')
    } catch (e) {
      // ignore
    } finally {
      clearAuth()
      router.push('/login')
    }
  }
  </script>
  