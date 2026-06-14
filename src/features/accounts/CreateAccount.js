const express = require('express');
const router = express.Router();
const pool = require('../../core/database.js'); // Memanggil koneksi database

// Endpoint: POST /api/accounts
router.post('/', async (req, res) => {
    try {
        // 1. Tangkap data yang dikirim oleh pengguna (dari Postman/Frontend)
        const {
            user_id,
            account_name,
            account_type,
            account_base_currency,
            account_description
        } = req.body;

        // 2. Siapkan perintah SQL (Gunakan $1, $2 dst untuk mencegah SQL Injection!)
        const query = `
            INSERT INTO accounts (user_id, account_name, account_type, account_base_currency, account_description) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *; -- Mengembalikan data yang baru saja dimasukkan
        `

        // 3. Masukkan variabel ke dalam array
        const values = [user_id, account_name, account_type, account_base_currency, account_description];

        // 4. Eksekusi ke PostgreSQL
        const result = await pool.query(query, values);

        // 5. Kembalikan respons sukses ke pengguna
        res.status(201).json({
            status: 'success',
            message: 'Account berhasil dibuat.',
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error saat membuka akun', error);
        
        const isDevelopment = process.env.NODE_ENV === 'development';
        
        res.status(500).json({
            status: 'error',
            message: isDevelopment ? error.message : 'Terjadi kesalahan internal pada server.'
        });
    }
});

module.exports = router;