
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Validate item information
function validateItem(data) {
    const {
        item_name,
        category,
        location_found,
        date_found,
        is_claimed
    } = data;

    if (
        typeof item_name !== 'string' || !item_name.trim() ||
        typeof category !== 'string' || !category.trim() ||
        typeof location_found !== 'string' || !location_found.trim() ||
        !date_found
    ) {
        return 'Please provide valid item_name, category, location_found, and date_found';
    }

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date_found)) {
        return 'date_found must use YYYY-MM-DD format';
    }

    // Validate actual date
    const date = new Date(date_found + 'T00:00:00Z');

    if (
        Number.isNaN(date.getTime()) ||
        date.toISOString().slice(0, 10) !== date_found
    ) {
        return 'Please provide a valid date';
    }

    // Validate claimed status
    if (
        is_claimed !== undefined &&
        typeof is_claimed !== 'boolean' &&
        is_claimed !== 0 &&
        is_claimed !== 1
    ) {
        return 'is_claimed must be true or false';
    }

    return null;
}

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

// GET a single item by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT * FROM items WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                message: 'Error retrieving item',
                error: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        res.status(200).json(results[0]);
    });
});

// POST a new item
router.post('/', (req, res) => {
    const validationError = validateItem(req.body);

    if (validationError) {
        return res.status(400).json({
            message: validationError
        });
    }

    const {
        item_name,
        category,
        description,
        location_found,
        date_found,
        is_claimed
    } = req.body;

    const sql = `
        INSERT INTO items
        (item_name, category, description, location_found, date_found, is_claimed)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            item_name.trim(),
            category.trim(),
            description || null,
            location_found.trim(),
            date_found,
            is_claimed ?? false
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error adding item',
                    error: err.message
                });
            }

            res.status(201).json({
                message: 'Item added successfully',
                itemId: result.insertId
            });
        }
    );
});

// PUT update an existing item
router.put('/:id', (req, res) => {
    const id = req.params.id;

    const validationError = validateItem(req.body);

    if (validationError) {
        return res.status(400).json({
            message: validationError
        });
    }

    const {
        item_name,
        category,
        description,
        location_found,
        date_found,
        is_claimed
    } = req.body;

    const sql = `
        UPDATE items
        SET item_name = ?,
            category = ?,
            description = ?,
            location_found = ?,
            date_found = ?,
            is_claimed = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            item_name.trim(),
            category.trim(),
            description || null,
            location_found.trim(),
            date_found,
            is_claimed ?? false,
            id
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error updating item',
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Item not found'
                });
            }

            res.status(200).json({
                message: 'Item updated successfully'
            });
        }
    );
});

// DELETE an item by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM items WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Error deleting item',
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        res.status(200).json({
            message: 'Item deleted successfully'
        });
    });
});

module.exports = router;
