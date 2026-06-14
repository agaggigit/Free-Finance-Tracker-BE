const express = require('express');
const router = express.Router();
const pool = require('../../core/database');

router.post('/', async (req, res) => {
    try {
        const {
            user_id,
            book_name,
            book_description
        } = req.body;

        const query = `
            INSERT INTO books (user_id, book_name, book_description)
            VALUES ($1, $2, $3)
            RETURNING *;
        `

        const values = [user_id, book_name, book_description];

        const result = await pool.query(query, values);

        res.status(201).json({
            status: 'success',
            message: 'Buku keuangan berhasil dibuat!',
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error saat membuat buku:', error);
        
        const isDevelopment = process.env.NODE_ENV === 'development';
        res.status(500).json({ 
            status: 'error', 
            message: isDevelopment ? error.message : 'Terjadi kesalahan internal pada server.' 
        });
    } 
});

module.exports = router;