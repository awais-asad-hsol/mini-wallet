# 💸 Mini Wallet Application (High-Performance Version)

A simplified **digital wallet application** built with **Laravel 12 (API)** and **Vue 3 (SPA)**.  
This project demonstrates **secure authentication, money transfers, real-time updates with Pusher, and scalable balance management**.

---

## 🚀 Features

- 🔐 **Authentication**  
  - Register & login via Laravel Sanctum tokens.  
  - Protects all wallet APIs with `auth:sanctum`.  

- 💰 **User Wallets**  
  - Each user has a balance (`decimal`) column.  
  - Starting seed data includes two demo accounts.  
  - Balances are updated **atomically** with database transactions and row-level locking.  

- 🔄 **Transactions**  
  - Send money to another user.  
  - Commission (1.5%) is deducted automatically.  
    - Example: If User1 sends `100.00` → User1 is debited `101.50`, User2 receives `100.00`.  
  - All transactions are validated (receiver must exist, amount must be positive, sender must have enough balance).  
  - Transaction history includes: sender, receiver, amount, commission, total debited, and timestamp.  

- ⚡ **Real-Time Updates**  
  - Uses **Pusher + Laravel Broadcasting**.  
  - Both sender and receiver get instant updates (no page refresh).  

- 🎨 **Frontend (Vue 3 + Composition API)**  
  - Dashboard shows **balance** + **transaction history**.  
  - Sidebar navigation for Sent / Received Transactions.  
  - Transaction form with real-time validation.  
  - Responsive, clean UI with Bootstrap.  

---

## 🛠️ Tech Stack

**Backend**
- PHP 8.2
- Laravel 12
- Laravel Sanctum (API authentication)
- Pusher PHP Server (real-time broadcasting)
- MySQL or PostgreSQL (database)

**Frontend**
- Vue 3 (Composition API)
- Pinia (state management)
- Axios (API calls)
- Bootstrap 5

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/awais-asad-hsol/mini-wallet
cd mini-wallet

### 2. Install Backend Dependencies
```bash
composer install


### 3. Install Frontend Dependencies
```bash
npm install


### 4. Configure Environment
```bash
cp .env.example .env

# Open the .env file and update your DB and Pusher credentials:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=mini_wallet
# DB_USERNAME=root
# DB_PASSWORD=
#
# QUEUE_CONNECTION=sync 
#
# PUSHER_APP_ID=your-app-id
# PUSHER_APP_KEY=your-app-key
# PUSHER_APP_SECRET=your-app-secret
# PUSHER_APP_CLUSTER=mt1
#
# BROADCAST_DRIVER=pusher
#
# VITE_PUSHER_APP_KEY=your-app-key  
# VITE_PUSHER_APP_CLUSTER=ap2


### 5. Run Migrations & Seeders
```bash

php artisan migrate --seed

# This will create two demo accounts:
# User1 → user1@example.com / password / Balance: 1000.00
# User2 → user2@example.com / password / Balance: 500.00

### 6. Run the Application
```bash

php artisan serve
npm run dev

# Open in browser:
# API      → http://127.0.0.1:8000/api
# Frontend → http://127.0.0.1:5173
