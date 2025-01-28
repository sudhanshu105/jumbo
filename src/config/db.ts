import { DataSource } from 'typeorm';
import { Product } from '../entities/Product';
import { Category } from '../entities/Category';
import { User } from '../entities/User';
import fs from 'fs';
import path from 'path';

// Ensure you load environment variables before using them
import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST, // Ensure DB_HOST is correct
  port: parseInt(process.env.DB_PORT || '5432'), // Default Postgres port
  username: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Product, Category, User],
  synchronize: true,
  logging: true,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.join(__dirname, '../../ca.pem')).toString(),
  },
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};
