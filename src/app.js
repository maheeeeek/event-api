const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');
const { notFound, errorHandler } = require('./middleware/error');

const app = express();

// Core middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS (allow credentials for cookie)
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
