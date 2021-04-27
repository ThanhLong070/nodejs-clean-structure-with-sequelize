class AppError extends Error {
  constructor(message, status = 500, errorCode = 500) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
    this.message = message;
  }
}

module.exports = AppError;
