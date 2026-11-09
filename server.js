
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const itemRoutes = require('./routes/itemRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/items', itemRoutes);
// Test route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Lost and Found API is running!'
    });
});

// Server port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
