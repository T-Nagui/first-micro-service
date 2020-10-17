import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to database";
  constructor() {
    super("Problem with database");
    // because extend base native class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serlializeErrors() {
    return [{ message: this.reason }];
  }
}
