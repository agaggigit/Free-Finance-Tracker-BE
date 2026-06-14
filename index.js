const express = require('express')
const dotenv = require('dotenv')

// Mengaktifkan dotenv agar nanti bisa membaca file .env
dotenv.config()

const app = express()

// Menggunakan port dari .env, atau port 3000 sebagai cadangan
const PORT = process.env.PORT || 3000;

// Middleware wajib: Mengizinkan Express untuk membaca data berbentuk JSON yang dikirim oleh pengguna
app.use(express.json());

// Endpoint percobaan (Health Check)
app.get('/', (_req, res) => {
    res.json({
        status: "success",
        message: "API Free Finance Tracker Gacor On Command"
    });
});

// Daftarkan Vertical Slice API di sini
app.use('/api/accounts', require('./src/features/accounts/CreateAccount.js'));
app.use('/api/accounts', require('./src/features/accounts/GetAccount.js'));
app.use('/api/transactions', require('./src/features/transactions/CreateTransaction.js'));
app.use('/api/transactions', require('./src/features/transactions/GetTransaction.js'));
app.use('/api/books', require('./src/features/books/CreateBook.js'));
app.use('/api/categories', require('./src/features/categories/CreateCategory.js'));

// Menyalakan server
app.listen(PORT, () => {
    console.log(`Server berhasil berjalan di http://localhost:${PORT}`)
});