import { CustomError } from './custom-error';

export class NotAuthuraizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not authorized');

    Object.setPrototypeOf(this, NotAuthuraizedError.prototype);
  }

  serlializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}
