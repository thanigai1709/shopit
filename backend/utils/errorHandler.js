class ErrorHandler extends Error {
	constructor(message, errCode) {
		super(message);
		this.statusCode = errCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = ErrorHandler;
