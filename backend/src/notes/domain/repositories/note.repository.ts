import { Note } from '../entities/note.entity';

export interface NoteRepository {
    findById(id: string): Promise<Note | null>;
    findByCreatedBy(userId: string): Promise<Note[]>;
    findBySharedWith(userId: string): Promise<Note[]>;
    findByStatus(status: string): Promise<Note[]>;
    findByType(type: string): Promise<Note[]>;
    findAccessibleByUser(userId: string): Promise<Note[]>;
    save(note: Note): Promise<Note>;
    delete(id: string): Promise<void>;
}