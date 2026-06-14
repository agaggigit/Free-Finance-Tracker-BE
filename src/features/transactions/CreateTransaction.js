const express = require('express');
const router = express.Router();
const pool = require('../../core/database');

router.post('/', async (req, res) => {
    // Meminjam satu koneksi eksklusif dari pool
    const client = await pool.connect();

    try {
        const { 
            transaction_book_id,
            transaction_category_id,
            transaction_account_id, 
            transaction_amount, 
            transaction_currency,
            transaction_description, 
            transaction_type 
        } = req.body;

        // === TANTANGAN 1 ===
        // Mulai transaksi database dengan mengeksekusi perintah SQL 'BEGIN'
        await client.query('BEGIN');

        // 1. Catat histori transaksinya
        const insertTxQuery = `
            INSERT INTO transactions 
            (transaction_book_id, transaction_category_id, transaction_account_id, transaction_amount, transaction_currency, transaction_description, transaction_type)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        const txValues = [transaction_book_id, transaction_category_id, transaction_account_id, transaction_amount, transaction_currency, transaction_description, transaction_type];
        const txResult = await client.query(insertTxQuery, txValues);

        // === TANTANGAN 2 ===
        // 2. Update saldo dompet (accounts)
        // Logika sederhana: Jika tipenya 'EXPENSE' (Pengeluaran), saldo harus dikurangi. Jika 'INCOME' (Pemasukan), saldo ditambah.
        // Tulis perintah SQL UPDATE untuk mengubah 'account_balance' di tabel accounts berdasarkan 'transaction_account_id'.
        // Petunjuk: Di SQL kamu bisa pakai matematika langsung, contoh: SET kolom = kolom - $1
        let updateAccountQuery = '';
        if (transaction_type === 'EXPENSE') {
            updateAccountQuery = `
                UPDATE accounts
                SET account_balance = account_balance - $1
                WHERE account_id = $2
            `;
        } else if (transaction_type === 'INCOME') {
            updateAccountQuery = `
                UPDATE accounts
                SET account_balance = account_balance + $1
                WHERE account_id = $2
            `;
        }
        
        // Eksekusi update saldo (menggunakan transaction_amount dan transaction_account_id)
        await client.query(updateAccountQuery, [transaction_amount, transaction_account_id]);

        // === TANTANGAN 3 ===
        // Semua sukses! Kunci perubahannya secara permanen.
        await client.query('COMMIT');

        res.status(201).json({
            status: 'success',
            message: 'Transaksi berhasil dicatat dan saldo telah diperbarui!',
            data: txResult.rows[0]
        });

    } catch (error) {
        // Jika ada error di baris manapun, batalkan semua perubahan yang belum di-commit
        await client.query('ROLLBACK');
        console.error('Error saat mencatat transaksi:', error);
        
        const isDevelopment = process.env.NODE_ENV === 'development';
        res.status(500).json({ 
            status: 'error', 
            message: isDevelopment ? error.message : 'Terjadi kesalahan internal pada server.' 
        });
    } finally {
        // Jangan lupa kembalikan koneksi ke kolam agar tidak memory leak
        client.release();
    }
});

module.exports = router;