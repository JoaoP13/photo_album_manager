class SqLiteAccessError extends Error {
  public status: number;
  public errorType: string;
  public message: string;

  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
    this.errorType = 'SqLiteAccessError';

    Object.setPrototypeOf(this, SqLiteAccessError.prototype);
  }

  getErrorStack() {
    return this.stack;
  }
}

export default SqLiteAccessError;
