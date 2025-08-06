import { DomainEvent } from '../../../shared/domain/events/domain-event';

export class NoteCreatedEvent extends DomainEvent {
    constructor(
        public readonly noteId: string,
        public readonly title: string,
        public readonly content: string,
        public readonly createdBy: string,
        public readonly type: string,
        public readonly status: string,
        public readonly sharedWith: string[]
    ) {
        super(noteId);
    }

    getEventName(): string {
        return 'NoteCreated';
    }
}