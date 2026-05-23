import * as notesService from '../../src/services/notes.service';

describe('notes.service', () => {
  beforeEach(() => {
    notesService.reset();
  });

  test('returns all initial notes', () => {
    const notes = notesService.getAll();

    expect(notes).toHaveLength(3);
    expect(notes[0].content).toBe('HTML is easy');
  });

  test('returns a note by id', () => {
    const note = notesService.getById(1);

    expect(note).toBeDefined();
    expect(note?.id).toBe(1);
    expect(note?.important).toBe(true);
  });

  test('creates a new note with default important value', () => {
    const note = notesService.create({
      content: 'Unit test note',
    });

    expect(note.id).toBe(4);
    expect(note.content).toBe('Unit test note');
    expect(note.important).toBe(false);
    expect(notesService.getAll()).toHaveLength(4);
  });

  test('throws an error when content is missing', () => {
    expect(() => notesService.create({ important: true })).toThrow('content missing');
  });

  test('removes a note by id', () => {
    notesService.remove(1);

    const notes = notesService.getAll();

    expect(notes).toHaveLength(2);
    expect(notesService.getById(1)).toBeUndefined();
  });
});