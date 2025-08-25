const { validationResult } = require('express-validator');
const Event = require('../models/Event');

// Create Event
exports.createEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const eventData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      organizerName: req.body.organizerName,
      createdBy: req.user._id,
    };

    if (req.file) {
      eventData.eventBanner = `/uploads/${req.file.filename}`;
    }

    const event = await Event.create(eventData);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

// Get all events (created by current user)
exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
};

// Get single event
exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    next(err);
  }
};

// Update event
exports.updateEvent = async (req, res, next) => {
  try {
    const updates = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      organizerName: req.body.organizerName,
    };

    if (req.file) updates.eventBanner = `/uploads/${req.file.filename}`;

    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    next(err);
  }
};

// Delete event
exports.deleteEvent = async (req, res, next) => {
  try {
    const deleted = await Event.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    if (!deleted) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    next(err);
  }
};
