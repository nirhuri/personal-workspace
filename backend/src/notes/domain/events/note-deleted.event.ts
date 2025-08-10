import { DomainEvent } from '../../../shared/domain/events/domain-event';

export class NoteDeletedEvent extends DomainEvent {
    constructor(
        public readonly noteId: string,
        public readonly deletedBy: string
    ) {
        super(noteId, 1);
    }

    getEventName(): string {
        return 'NoteDeleted';
    }
}