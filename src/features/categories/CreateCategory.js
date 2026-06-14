const express = require('express');
const router = express.Router();
const pool = require('../../core/database');

router.post('/', async (req, res) => {
    try {
        const {
            user_id,
            category_name,
            category_type,
            category_description
        } = req.body;

        const query = `
            INSERT INTO categories (user_id, category_name, category_type, category_description)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `

        const values = [user_id, category_name, category_type, category_description];

        const result = await pool.query(query, values);

        res.status(201).json({
            status: 'success',
            message: 'Kategori berhasil dibuat!',
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error saat membuat kategori:', error);
        
        const isDevelopment = process.env.NODE_ENV === 'development';
        res.status(500).json({ 
            status: 'error', 
            message: isDevelopment ? error.message : 'Terjadi kesalahan internal pada server.' 
        });
    } 
});

module.exports = router;