const express = require('express');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { createEventRules, idRule } = require('../validators/event.validators');
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/event.controller');

const router = express.Router();

// All routes protected
router.use(protect);

// Create
router.post('/', upload.single('eventBanner'), createEventRules, createEvent);

// List
router.get('/', getEvents);

// Read
router.get('/:id', idRule, getEventById);

// Update
router.put('/:id', idRule, upload.single('eventBanner'), createEventRules, updateEvent);

// Delete
router.delete('/:id', idRule, deleteEvent);

module.exports = router;
