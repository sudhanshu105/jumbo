import { Product } from '../entities/Product';
import { Pagination } from '../utils/pagination';
import { AppDataSource } from '../config/db';

export class ProductService {
  static async getProducts({ page, limit, tag, price, search }: { page: number; limit: number; tag?: string; price?: string; search?: string }) {
    const productRepository = AppDataSource.getRepository(Product);
    const query = productRepository.createQueryBuilder('product');

    if (tag) query.andWhere('product.tag = :tag', { tag });
    if (price) query.andWhere('product.price = :price', { price });
    if (search) query.andWhere('product.name LIKE :search', { search: `%${search}%` });

    const [products, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return new Pagination(products, total, page, limit);
  }

  static async getProductById(id: string) {
    const productRepository = AppDataSource.getRepository(Product);
    return await productRepository.findOneBy({ id: parseInt(id) });
  }

  static async createProduct(productData: Partial<Product>) {
    const productRepository = AppDataSource.getRepository(Product);
    const product = productRepository.create(productData);
    return await productRepository.save(product);
  }

  static async updateProduct(id: string, productData: Partial<Product>) {
    const productRepository = AppDataSource.getRepository(Product);
    await productRepository.update(id, productData);
    return await productRepository.findOneBy({ id: parseInt(id) });
  }

  static async deleteProduct(id: string) {
    const productRepository = AppDataSource.getRepository(Product);
    await productRepository.delete(id);
  }
}