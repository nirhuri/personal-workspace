import { DomainEvent } from '../../../shared/domain/events/domain-event';

export class NoteSharedEvent extends DomainEvent {
    constructor(
        public readonly noteId: string,
        public readonly userId: string,
        public readonly sharedBy: string,
        public readonly action: 'ADD' | 'REMOVE'
    ) {
        super(noteId, 1);
    }

    getEventName(): string {
        return 'NoteShared';
    }
}