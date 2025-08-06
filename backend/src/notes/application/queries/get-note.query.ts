import { Query } from '@/shared/application/queries/query';
import { Note } from '@/notes/domain/entities/note.entity';

export class GetNoteQuery implements Query<Note | null> {
    readonly queryId: string;
    readonly occurredOn: Date;

    constructor(
        public readonly noteId: string
    ) {
        this.queryId = `get_note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.occurredOn = new Date();
    }
}