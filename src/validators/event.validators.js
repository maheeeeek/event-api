const { body, param } = require('express-validator');


const createEventRules = [
body('title').trim().notEmpty().withMessage('Title required'),
body('description').trim().notEmpty().withMessage('Description required'),
body('date').notEmpty().withMessage('Date required'),
body('time').trim().notEmpty().withMessage('Time required'),
body('location').trim().notEmpty().withMessage('Location required'),
body('organizerName').trim().notEmpty().withMessage('Organizer name required'),
];


const idRule = [param('id').isMongoId().withMessage('Invalid id')];


module.exports = { createEventRules, idRule };