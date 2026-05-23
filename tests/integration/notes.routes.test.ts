import request from 'supertest';
import app from '../../src/app';
import * as notesService from '../../src/services/notes.service';

describe('notes routes', () => {
  beforeEach(() => {
    notesService.reset();
  });

  test('GET /api/notes returns all notes', async () => {
    const response = await request(app)
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(3);
    expect(response.body[0].content).toBe('HTML is easy');
  });

  test('GET /api/notes/:id returns one note', async () => {
    const response = await request(app)
      .get('/api/notes/1')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.id).toBe(1);
    expect(response.body.content).toBe('HTML is easy');
  });

  test('GET /api/notes/:id returns 404 for unknown note', async () => {
    await request(app)
      .get('/api/notes/999')
      .expect(404);
  });

  test('POST /api/notes creates a new note', async () => {
    const newNote = {
      content: 'Integration test note',
      important: true,
    };

    const response = await request(app)
      .post('/api/notes')
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.content).toBe(newNote.content);
    expect(response.body.important).toBe(true);
    expect(response.body.id).toBe(4);
  });

  test('POST /api/notes returns 400 when content is missing', async () => {
    const response = await request(app)
      .post('/api/notes')
      .send({ important: true })
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toBe('content missing');
  });

  test('DELETE /api/notes/:id removes a note', async () => {
    await request(app)
      .delete('/api/notes/1')
      .expect(204);

    const response = await request(app)
      .get('/api/notes')
      .expect(200);

    expect(response.body).toHaveLength(2);
  });
});
