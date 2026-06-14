const express = require('express');
const router = express.Router();
const pool = require('../../core/database');

// === TANTANGAN 1 ===
// Tentukan HTTP Method yang paling tepat untuk mengambil data. 
// Ganti kata 'METHOD_APA' dengan method yang benar!
router.get('/', async (req, res) => {
    try {
        // === TANTANGAN 2 ===
        // Tulis perintah SQL yang tepat untuk mengambil SELURUH kolom dan baris 
        // dari tabel accounts milik kita.
        const query = `
            SELECT * FROM accounts
        `;

        // Eksekusi query ke database
        const result = await pool.query(query);

        // === TANTANGAN 3 ===
        // Kirim respons sukses ke client (REST Client/Browser) beserta datanya.
        // Berapa status code yang paling cocok untuk respons sukses membaca data (Ganti 200 atau pakai yang lain)?
        // Dan bagaimana cara mengambil array data hasil query dari objek 'result'?
        res.status(200).json({
            status: 'success',
            data: result.rows// TULIS CARA MENGAMBIL DATANYA DI SINI
        });

    } catch (error) {
        console.error('Error saat mengambil data akun:', error);
        const isDevelopment = process.env.NODE_ENV === 'development';
        res.status(500).json({ 
            status: 'error', 
            message: isDevelopment ? error.message : 'Terjadi kesalahan internal pada server.' 
        });
    }
});

module.exports = router;