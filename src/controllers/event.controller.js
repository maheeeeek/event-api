const { validationResult } = require('express-validator');
const Event = require('../models/Event');

// POST /api/events
const createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const data = { ...req.body, creator: req.user._id };
  const event = await Event.create(data);
  res.status(201).json({ event });
};

// GET /api/events
const getEvents = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 }).populate('creator', 'name email');
  res.json({ events });
};

// GET /api/events/:id
const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id).populate('creator', 'name email');
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json({ event });
};

// PATCH /api/events/:id
const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  if (event.creator.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Only the creator can update this event' });
  }
  const fields = ['title','description','date','time','location','organizerName','eventBanner'];
  fields.forEach(f => { if (req.body[f] !== undefined) event[f] = req.body[f]; });
  await event.save();
  res.json({ event });
};

// DELETE /api/events/:id
const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  if (event.creator.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Only the creator can delete this event' });
  }
  await event.deleteOne();
  res.json({ message: 'Event deleted' });
};

module.exports = { createEvent, getEvents, getEventById, updateEvent, deleteEvent };
