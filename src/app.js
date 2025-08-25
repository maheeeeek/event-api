const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');
const { notFound, errorHandler } = require('./middleware/error');


const app = express();


// Middlewares
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// CORS for cookie-based auth
app.use(cors({
origin: process.env.CORS_ORIGIN?.split(',') || '*',
credentials: true,
}));


// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes); // all protected inside the routes


// 404 + error handler
app.use(notFound);
app.use(errorHandler);


module.exports = app;