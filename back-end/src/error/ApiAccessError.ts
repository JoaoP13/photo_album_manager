class ApiAccessError extends Error {
  public status: number;
  public errorType: string;
  public message: string;

  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
    this.errorType = 'ApiAccessError';

    Object.setPrototypeOf(this, ApiAccessError.prototype);
  }

  getErrorStack() {
    return this.stack;
  }
}

export default ApiAccessError;
