import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './Category';
import { User } from './User';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('decimal')
  price!: number;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;

  @Column({ nullable: true })
  image_url?: string;

  @Column()
  tag!: string;

  @ManyToOne(() => User, (user) => user.products)
  user!: User;
}
