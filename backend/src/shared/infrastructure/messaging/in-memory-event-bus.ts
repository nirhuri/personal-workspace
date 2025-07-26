import { Injectable } from '@nestjs/common';
import { EventBus, EventHandler } from '../../application/events/event-bus';
import { DomainEvent } from '@/shared/domain/events/domain-event';

@Injectable()
export class InMemoryEventBus implements EventBus {
    private handlers: Map<string, EventHandler<DomainEvent>[]> = new Map();

    registerHandler(eventName: string, handler: EventHandler<DomainEvent>): void {
        if (!this.handlers.has(eventName)) {
            this.handlers.set(eventName, []);
        }
        this.handlers.get(eventName)!.push(handler);
    }

    async publish(event: DomainEvent): Promise<void> {
        const eventName = event.getEventName();
        const handlers = this.handlers.get(eventName) || [];

        for (const handler of handlers) {
            await handler.handle(event);
        }
    }

    async publishAll(events: DomainEvent[]): Promise<void> {
        for (const event of events) {
            await this.publish(event);
        }
    }
}