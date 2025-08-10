import { DomainEvent } from '../../../shared/domain/events/domain-event';

export class UserCreatedEvent extends DomainEvent {
    constructor(
        public readonly userId: string,
        public readonly email: string,
        public readonly name: string,
        public readonly googleId: string,
        public readonly picture?: string
    ) {
        super(userId, 1); // Pass version 1 for new events
    }

    getEventName(): string {
        return 'UserCreated';
    }
}