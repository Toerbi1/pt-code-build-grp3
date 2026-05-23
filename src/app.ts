import express, { Request, Response, NextFunction } from 'express';
import notesRouter from './routes/notes.routes';

type AppError = Error & {
  statusCode?: number;
};

const app = express();

app.use(express.json());

app.get('/', (_request: Request, response: Response) => {
  response.send('<h1>Hello World!</h1>');
});

app.use('/api/notes', notesRouter);

app.use((
  error: AppError,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error.statusCode) {
    return response.status(error.statusCode).json({
      error: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    error: 'internal server error',
  });
});

export default app;