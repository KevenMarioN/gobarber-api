import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import '../typeorm';
import uploadConfig from '@config/upload';
import routes from './routes';
import AppError from '@shared/errors/AppError';


const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'internal server error'
  });
});

app.listen(3333, () => {
  console.log('🚀 Server running in port 3333!');
});
