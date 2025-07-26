import { DomainEvent } from '../../../shared/domain/events/domain-event';

export class UserCreatedEvent extends DomainEvent {
    constructor(
        public readonly userId: string,
        public readonly email: string,
        public readonly name: string
    ) {
        super(userId);
    }

    getEventName(): string {
        return 'UserCreated';
    }
}