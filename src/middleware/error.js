const notFound = (req, res, next) => {
const error = new Error(`Not Found - ${req.originalUrl}`);
res.status(404);
next(error);
};


const errorHandler = (err, req, res, next) => {
const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
res.status(statusCode);
res.json({
message: err.message || 'Server Error',
stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
});
};


module.exports = { notFound, errorHandler };