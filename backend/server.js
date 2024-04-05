import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDb from './config/db.js';
import productRoutes from './routes/product.routes.js';
import { notFound, errorHandler } from './middleware/error.middleware.js';

connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${port}`)
);
