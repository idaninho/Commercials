import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import commercialRoutes from './routes/commercialRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import clientRoute from './routes/clientRoute.js';
import { notFound, errorHandler } from './middleware.js/errorMiddleware.js';

const app = express();
dotenv.config();
connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());
app.use('/api/commercials', commercialRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/connected', clientRoute);

const __dirname = path.resolve();
//dirname does not work with ES modules, only native JS, thats why we make it a variable
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
