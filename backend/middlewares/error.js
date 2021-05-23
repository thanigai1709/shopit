const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";

	if (process.env.NODE_ENV === "DEVELOPMENT") {
		res.status(err.statusCode).json({
			success: false,
			error: err,
			message: err.message,
			stack: err.stack,
		});
	}
	if (process.env.NODE_ENV === "PRODUCTION") {
		let error = { ...err };
		error.message = err.message;
		// MongoId error
		if (err.name === "CastError") {
			const message = `Resource not found. Invalid: ${err.path}`;
			error = new ErrorHandler(message, 400);
		}
		// Mongoose validation error
		if (err.name === "ValidationError") {
			const message = Object.values(err.errors).map((value) => value.message);
			error = new ErrorHandler(message, 400);
		}
		res.status(error.statusCode).json({
			success: false,
			message: error.message,
		});
	}
};
