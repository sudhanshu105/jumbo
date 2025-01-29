import { Product } from '../entities/Product';
import { Pagination } from '../utils/pagination';
import { AppDataSource } from '../config/db';
import { Category } from '../entities/Category';

export class ProductService {
  static async getProducts({ page, limit, tag, price, search, minPrice, maxPrice }: { page: number; limit: number; tag?: string; price?: string; search?: string; minPrice?: number; maxPrice?: number }) {
    const productRepository = AppDataSource.getRepository(Product);
    const query = productRepository.createQueryBuilder('product') .leftJoinAndSelect('product.category', 'category');

    if (tag) query.andWhere('product.tag = :tag', { tag });
    if (price) query.andWhere('product.price = :price', { price });
    if (search) query.andWhere('LOWER(product.name) LIKE LOWER(:search)', { search: `%${search}%` });
    if (minPrice !== undefined) query.andWhere('product.price >= :minPrice', { minPrice });
    if (maxPrice !== undefined) query.andWhere('product.price <= :maxPrice', { maxPrice });

    const [products, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return new Pagination(products, total, page, limit);
}

  static async getProductById(id: string) {
    const productRepository = AppDataSource.getRepository(Product);
    return await productRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['category']
    });
  }

  static async createProduct(productData: Partial<Product>) {
    const productRepository = AppDataSource.getRepository(Product);
    const categoryRepository = AppDataSource.getRepository(Category);

    if (!productData.name) {
      throw new Error('Product name is required');
    }
    if (!productData.price) {
      throw new Error('Product price is required');
    }
    if(!productData.tag){
      throw new Error('Product tag is required');
    }

    let category;
    if (productData.category) {
      category = await categoryRepository.findOne({ where: { name: productData.category as unknown as string } });
      if (!category) {
        category = categoryRepository.create({ name: productData.category as unknown as string });
        await categoryRepository.save(category);
      }
    } else {
      category = await categoryRepository.findOne({ where: { name: 'unassigned' } });
      if (!category) {
        category = categoryRepository.create({ name: 'unassigned' });
        await categoryRepository.save(category);
      }
    }

    const product = productRepository.create({ ...productData, category: category as Category });
    return await productRepository.save(product);
  }

  static async updateProduct(id: string, productData: Partial<Product>) {
    const productRepository = AppDataSource.getRepository(Product);
    const categoryRepository = AppDataSource.getRepository(Category);

    if (productData.category) {
      let category = await categoryRepository.findOne({ where: { name: productData.category as unknown as string } });
      if (!category) {
        category = categoryRepository.create({ name: productData.category as unknown as string });
        await categoryRepository.save(category);
      }
      productData.category = category;
    }

    await productRepository.update(id, productData);
    return await productRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['category']
    });
  }

  static async deleteProduct(id: string) {
    const productRepository = AppDataSource.getRepository(Product);
    await productRepository.delete(id);
  }
}
