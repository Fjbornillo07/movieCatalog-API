const express = require('express');
const app = express();
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/users', authRoutes);  
app.use('/movies', movieRoutes);

// Start
const PORT = 4000;

if(require.main === module){

    app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

}

module.exports = { app , mongoose };