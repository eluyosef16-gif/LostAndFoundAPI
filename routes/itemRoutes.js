const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all items
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM items';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: 'Error retrieving items',
                error: err.message
            });
        }

        res.status(200).json(results);
    });
});

module.exports = router;