import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';
import { Product } from '../entities/Product';

export const validateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product = plainToClass(Product, req.body);
  const errors = await validate(product);
  if (errors.length > 0) {
    res.status(400).json(errors);
  } else {
    next();
  }
};