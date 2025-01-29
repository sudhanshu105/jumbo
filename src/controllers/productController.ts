import { Request, Response } from 'express';
import { ProductService } from '../services/productServices';

export class ProductController {
  static async getProducts(req: Request, res: Response) {
    const { page = 1, limit = 10, tag, price, search, minPrice, maxPrice } = req.query;
    const products = await ProductService.getProducts({
      page: +page,
      limit: +limit,
      tag: tag as string,
      price: price as string,
      search: search as string,
      minPrice: minPrice ? +minPrice : undefined,
      maxPrice: maxPrice ? +maxPrice : undefined,
    });
    res.json(products);
  }

  static async getProductById(req: Request, res: Response) {
    const product = await ProductService.getProductById(req.params.id);
    if(!product){
      res.status(404).json({message: "No product available with this ID" });
    }
    else
    res.status(200).json(product);
  }

  static async createProduct(req: Request, res: Response) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json({message: "Product added successfully" ,product});
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }


  static async updateProduct(req: Request, res: Response) {
    try {
        const productId = req.params.id;  
        const productData = req.body;  

        // Call the ProductService to update the product
        const updatedProduct = await ProductService.updateProduct(productId, productData);

        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
        }
        else{
          res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating product"});
    }
}




  static async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    const product = await ProductService.getProductById(id);
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
    }
    else{
      await ProductService.deleteProduct(id);

      res.status(200).json({ message: 'Product deleted successfully' });
    }
  }

}
