class RequestError extends Error {
  private status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;

    Object.setPrototypeOf(this, RequestError.prototype);
  }

  getErrorMessage() {
    return this.message;
  }

  getErrorStack() {
    return this.stack;
  }

  getErrorStatus() {
    return this.status || 400;
  }
}

export default RequestError;
