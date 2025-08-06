import { Query } from '@/shared/application/queries/query';
import { Note } from '@/notes/domain/entities/note.entity';

export class GetNotesByCreatedQuery implements Query<Note[]> {
    readonly queryId: string;
    readonly occurredOn: Date;

    constructor(
        public readonly userId: string
    ) {
        this.queryId = `get_notes_by_created_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.occurredOn = new Date();
    }
}