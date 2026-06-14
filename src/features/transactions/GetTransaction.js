const express = require('express');
const router = express.Router();
const pool = require('../../core/database');

router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                t.transaction_date_time, 
                t.transaction_amount, 
                t.transaction_currency, 
                t.transaction_exchange_rate, 
                t.transaction_description, 
                t.transaction_type,
                a.account_name,
                c.category_name,
                c.category_type,
                c.category_description
            FROM
                transactions t
            INNER JOIN categories c ON t.transaction_category_id = c.category_id
            INNER JOIN accounts a ON t.transaction_account_id = a.account_id
            ORDER BY t.transaction_date_time DESC
        `

        const result = await pool.query(query);

        res.status(200).json({
            status: 'success',
            data: result.rows
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