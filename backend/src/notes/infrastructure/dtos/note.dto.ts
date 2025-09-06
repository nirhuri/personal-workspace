import { Note, NoteStatus, NoteType } from "@/notes/domain/entities/note.entity";

export class NoteDto {
    id: string;
    title: string;
    content: string;
    type: NoteType;
    status: NoteStatus;
    sharedWith: string[];
    createdBy: string;
    createdAt: string;
    updatedAt: string;

    constructor(note: Note) {
        this.id = note.id;
        this.title = note.title;
        this.content = note.content;
        this.type = note.type;
        this.status = note.status;
        this.sharedWith = note.sharedWith;
        this.createdBy = note.createdBy;
        this.createdAt = note.createdAt.toISOString();
        this.updatedAt = note.updatedAt.toISOString();
    }
}