import { DomainEvent } from '../../domain/events/domain-event';

// Event bus interface
export interface EventBus {
    publish(event: DomainEvent): Promise<void>;
    publishAll(events: DomainEvent[]): Promise<void>;
}

// Event handler interface
export interface EventHandler<T extends DomainEvent> {
    handle(event: T): Promise<void>;
}