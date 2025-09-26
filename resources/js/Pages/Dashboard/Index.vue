<template>
    <div>
      <div class="card">
        <div class="card-body">
          <h4>Dashboard</h4>
          <p>Welcome, {{ user?.name || 'User' }}.</p>
          <p>Your token: <small class="text-muted">{{ tokenSnippet }}</small></p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const tokenSnippet = localStorage.getItem('token') ? localStorage.getItem('token').slice(0, 20) + '...' : 'no-token';
  </script>
  