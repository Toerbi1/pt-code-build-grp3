export interface Note {
  id: number;
  content: string;
  date: string;
  important: boolean;
}

interface CreateNoteInput {
  content?: string;
  important?: boolean;
}

type ServiceError = Error & {
  statusCode?: number;
};

const initialNotes: Note[] = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2022-01-10T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2022-01-10T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2022-01-10T19:20:14.298Z',
    important: true,
  },
];

let notes: Note[] = [...initialNotes];

export const getAll = (): Note[] => {
  return notes;
};

export const getById = (id: string | number): Note | undefined => {
  const numericId = Number(id);
  return notes.find((note) => note.id === numericId);
};

const generateId = (): number => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map((note) => note.id))
    : 0;

  return maxId + 1;
};

export const create = ({ content, important }: CreateNoteInput): Note => {
  if (!content) {
    const error = new Error('content missing') as ServiceError;
    error.statusCode = 400;
    throw error;
  }

  const note: Note = {
    id: generateId(),
    content,
    important: important ?? false,
    date: new Date().toISOString(),
  };

  notes = notes.concat(note);

  return note;
};

export const remove = (id: string | number): void => {
  const numericId = Number(id);
  notes = notes.filter((note) => note.id !== numericId);
};

export const reset = (): void => {
  notes = [...initialNotes];
};