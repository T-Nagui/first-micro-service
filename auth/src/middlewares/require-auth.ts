import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthuraizedError } from '../errors/not-authorized-erros';
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.currentUser) {
    throw new NotAuthuraizedError();
  }
  next();
};
