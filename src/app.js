const express = require('express');
// const exampleRoutes = require('./routes/exampleRoutes');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express()

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan('dev')); // Logging middleware
app.use(helmet()); // Security headers


// Routes
// app.use('/api/example', exampleRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;