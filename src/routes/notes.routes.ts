import { Router, Request, Response, NextFunction } from 'express';
import * as notesService from '../services/notes.service';

const router = Router();

router.get('/', (_request: Request, response: Response) => {
  response.json(notesService.getAll());
});

router.get('/:id', (request: Request, response: Response) => {
  const note = notesService.getById(request.body.params.id);

  if (!note) {
    return response.status(404).end();
  }

  return response.json(note);
});

router.post('/', (request: Request, response: Response, next: NextFunction) => {
  try {
    const note = notesService.create(request.body);
    return response.json(note);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', (request: Request, response: Response) => {
  notesService.remove(request.body.params.id);
  return response.status(204).end();
});

export default router;