const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema(
{
title: { type: String, required: true, trim: true },
description: { type: String, required: true },
date: { type: Date, required: true },
time: { type: String, required: true }, // e.g., "18:30" or "6:30 PM"
location: { type: String, required: true },
organizerName: { type: String, required: true },
eventBanner: { type: String }, // file path or URL
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},
{ timestamps: true }
);


module.exports = mongoose.model('Event', eventSchema);