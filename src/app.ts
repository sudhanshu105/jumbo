import 'reflect-metadata'; // Import reflect-metadata
import express from 'express';
import { connectDB } from './config/db';
import productRoutes from './routes/productRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', productRoutes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});