import { Request, Response } from 'express';
import { ProductService } from '../services/productServices';

import { Product } from '../entities/Product';

export class ProductController {
  static async getProducts(req: Request, res: Response) {
    const { page = 1, limit = 10, tag, price, search } = req.query;
    const products = await ProductService.getProducts({
      page: +page,
      limit: +limit,
      tag: tag as string,
      price: price as string,
      search: search as string,
    });
    res.json(products);
  }

  static async getProductById(req: Request, res: Response) {
    const product = await ProductService.getProductById(req.params.id);
    res.json(product);
  }

  static async createProduct(req: Request, res: Response) {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json(product);
  }

  static async updateProduct(req: Request, res: Response) {
    const product = await ProductService.updateProduct(req.params.id, req.body);
    res.json(product);
  }

  static async deleteProduct(req: Request, res: Response) {
    await ProductService.deleteProduct(req.params.id);
    res.status(204).send();
  }
}
