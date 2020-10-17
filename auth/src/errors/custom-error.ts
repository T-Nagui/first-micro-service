export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    // because extend base native class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serlializeErrors(): { message: string; field?: string }[];
}
