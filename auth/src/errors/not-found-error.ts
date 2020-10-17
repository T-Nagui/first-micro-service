import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Route not found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serlializeErrors() {
    return [{ message: "Not found" }];
  }
}
