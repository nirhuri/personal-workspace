import { Note } from '@/types';
import apiClient from './client';
import { processAPIError } from './api-error';

export const notesApi = {
    getNotes: async (): Promise<Note[] | undefined> => {
        try {
            const { data } = await apiClient.get<Note[]>('/api/notes');
            console.log(data)
            return data;
        } catch (err: unknown) {
            processAPIError(err, 'notes');
        }
    },
    createNote: async (): Promise<Note | undefined> => {
        try {
            const { data } = await apiClient.post<Note>('/api/note');
            console.log(data)
            return data;
        } catch (err: unknown) {
            processAPIError(err, 'notes');
        }
    }
}