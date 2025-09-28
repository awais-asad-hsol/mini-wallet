<template>
    <div class="d-flex">
        <div class="bg-dark vh-100 d-flex flex-column p-3" style="width: 250px;">
            <h5 class="mb-4 text-white">💰 MiniWallet</h5>
    
            <ul class="nav nav-pills flex-column mb-auto">
            <li>
                <a class="nav-link text-white fw-bold" data-bs-toggle="collapse" href="#dashMenu">
                <i class="bi bi-speedometer2 me-2"></i> Dashboard
                </a>
                <ul class="collapse show list-unstyled ms-3" id="dashMenu">
                <li>
                    <router-link 
                    to="/dashboard" 
                    class="nav-link"
                    active-class="active-link"
                    >
                    🏠 Home
                    </router-link>
                </li>
                </ul>
            </li>

            <li class="mt-3">
                <a class="nav-link text-white fw-bold" data-bs-toggle="collapse" href="#txMenu">
                <i class="bi bi-cash-coin me-2"></i> Transactions
                </a>
                <ul class="collapse list-unstyled ms-3" id="txMenu">
                <li>
                    <router-link to="/transfer" class="nav-link" active-class="active-link">➕ Make Transaction</router-link>
                </li>
                <li>
                    <router-link to="/transactions/sent" class="nav-link" active-class="active-link">📤 Sent</router-link>
                </li>
                <li>
                    <router-link to="/transactions/received" class="nav-link" active-class="active-link">📥 Received</router-link>
                </li>
                </ul>
            </li>
            </ul>
    
            <div class="mt-auto">
                <a href="#" class="nav-link logout-link fw-bold" @click.prevent="logout">
                    <i class="bi bi-box-arrow-right me-2"></i> Logout
                </a>
            </div>
        </div>
  
        <!-- Main content -->
        <div class="flex-grow-1 p-4 bg-light">
            <router-view />
        </div>
    </div>
</template>
  
<style scoped>
    .nav-link {
        color: #adb5bd;
        transition: background 0.2s, color 0.2s;
    }
    .nav-link:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
    }
    
    .active-link {
        background: #0d6efd !important; 
        color: white !important;
        border-radius: 6px;
    }
    .logout-link {
        color: #dc3545 !important; 
        transition: background 0.2s, color 0.2s;
    }
    .logout-link:hover {
        background: rgba(220, 53, 69, 0.1);
        border-radius: 6px;
    }
</style>
  
<script setup>
    import { useRouter } from 'vue-router'
    import api from '../api'
    import { useAuth } from '../stores/auth'

    const router = useRouter()
    const { clearAuth } = useAuth()

    const logout = async () => {
        try {
            await api.post('/logout')
        } catch (e) {
        
        } finally {
            clearAuth()
            router.push('/login')
        }
    }

</script>