import { Note } from '@/types';
import apiClient from './client';
import { processAPIError } from './api-error';

export const notesApi = {
    getNotes: async (): Promise<Note[]> => {
        try {
            const { data } = await apiClient.get<Note[]>('/notes');
            console.log(data)
            return data;
        } catch (err: unknown) {
            processAPIError(err, 'notes');
            throw err;
        }
    },
    createNote: async (note: Note): Promise<Note> => {
        try {
            const { data } = await apiClient.post<Note>('/notes', note);
            console.log(data)
            return data;
        } catch (err: unknown) {
            processAPIError(err, 'notes');
            throw err;
        }
    }
}