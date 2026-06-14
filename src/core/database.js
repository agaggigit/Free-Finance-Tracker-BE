const { Pool } = require('pg');
const dotenv = require('dotenv');

// Membaca konfigurasi dari file .env
dotenv.config();

// Membuat kolam koneksi (Pool) baru
const pool = new Pool ({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
})

// Mengetes koneksi saat sistem pertama kali menyala
pool.connect((err, _client, release) => {
    if (err) {
        console.error('Gagal terhubung ke PostgreSQL:', err.stack);
    } else {
        console.log('Berhasil terhubung ke PostgreSQL');
        release(); // Penting: kembalikan koneksi ke kolam agar tidak bocor (memory leak)
    }
})

// Mengekspor pool agar bisa dipakai oleh folder fitur (Vertical Slice) nantinya
module.exports = pool;