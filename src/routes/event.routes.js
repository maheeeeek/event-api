const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createEventRules, idRule } = require('../validators/event.validators');
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/event.controller');

// All event routes protected
router.use(protect);

router.post('/', createEventRules, createEvent);
router.get('/', getEvents);
router.get('/:id', idRule, getEventById);
router.patch('/:id', idRule, updateEvent);
router.delete('/:id', idRule, deleteEvent);

module.exports = router;
