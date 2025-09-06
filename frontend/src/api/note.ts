import { Note } from '@/types';
import apiClient from './client';
import { processAPIError } from './api-error';
import { processResponseFromServer } from './api-interceptor';

export const notesApi = {
    getNotes: async (): Promise<Note[]> => {
        try {
            const { data } = await apiClient.get<{ data: Note[] }>('/notes/created');
            return processResponseFromServer(data) as Note[];
        } catch (err: unknown) {
            processAPIError(err, 'notes');
            throw err;
        }
    },
    createNote: async (note: Note): Promise<Note> => {
        try {
            const noteData = {
                title: note.title,
                content: note.content,
                type: note.type,
                sharedWith: note.sharedWith || []
            };
            console.log("createNote - before", noteData)
            const { data } = await apiClient.post<Note>('/notes', noteData);
            console.log("createNote - after", data)
            return data;
        } catch (err: unknown) {
            processAPIError(err, 'notes');
            throw err;
        }
    }
}