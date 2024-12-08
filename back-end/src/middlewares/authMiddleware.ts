/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import ApiAccessError from '../error/ApiAccessError';

type UserPayload = {
  id: number;
  email: string;
};

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  // TO-DO
  // Implementar validação de e-mail apenas
  // Não é necessário JWT

  next();
};
