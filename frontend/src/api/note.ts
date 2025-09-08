import { Note } from "@/types";
import apiClient from "./client";
import { processAPIError } from './api-error';
import { processResponseFromServer } from './api-interceptor';

export const notesApi = {
    list: async (): Promise<Note[]> => {
        try {
            const { data } = await apiClient.get<{ data: Note[] }>('/notes/created');
            return processResponseFromServer(data) as Note[];
        } catch (err: unknown) {
            processAPIError(err, 'notes');
            throw err;
        }
    },
    create: async (note: Partial<Note>): Promise<Note> => {
        try {
            const noteData = {
                title: note.title,
                content: note.content,
                type: note.type,
                sharedWith: note.sharedWith || []
            };
            const { data } = await apiClient.post<Note>('/notes', noteData);
            return data;
        } catch (err: unknown) {
            processAPIError(err, 'notes');
            throw err;
        }
    },
    update: async (id: string, note: Partial<Note>): Promise<Note> => {
        const res = await apiClient.put(`/notes/${id}`, note);
        return res.data.data;
    },
    remove: async (id: string): Promise<void> => {
        try {
            const { data } = await apiClient.delete<string>(`/notes/${id}`);
            console.log(data);
        } catch (err: unknown) {
            processAPIError(err, 'notes');
            throw err;
        }
    },
};