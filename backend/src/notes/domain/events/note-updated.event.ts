import { DomainEvent } from '../../../shared/domain/events/domain-event';

export class NoteUpdatedEvent extends DomainEvent {
    constructor(
        public readonly noteId: string,
        public readonly updatedBy: string,
        public readonly version: number,
        public readonly title?: string,
        public readonly content?: string
    ) {
        super(noteId, version);
    }

    getEventName(): string {
        return 'NoteUpdated';
    }
}