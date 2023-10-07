class ErrorHandler extends Error {
  constructor(statusCode, msg) {
    super(msg);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
