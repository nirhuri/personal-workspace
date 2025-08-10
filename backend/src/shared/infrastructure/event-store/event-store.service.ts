import { Injectable } from '@nestjs/common';
import { EventStoreRepository } from './event-store.repository';
import { DomainEvent } from '../../domain/events/domain-event';

@Injectable()
export class EventStoreService {
    constructor(
        private readonly eventStoreRepository: EventStoreRepository
    ) { }

    async saveEvent(event: DomainEvent, aggregateType: string): Promise<void> {
        await this.eventStoreRepository.save(event, aggregateType);
    }

    async getEvents(aggregateId: string): Promise<DomainEvent[]> {
        const storedEvents = await this.eventStoreRepository.getEvents(aggregateId);
        return storedEvents.map(storedEvent => storedEvent.eventData);
    }

    async getEventsByType(eventType: string): Promise<DomainEvent[]> {
        const storedEvents = await this.eventStoreRepository.getEventsByType(eventType);
        return storedEvents.map(storedEvent => storedEvent.eventData);
    }

    async getLastVersion(aggregateId: string): Promise<number> {
        return await this.eventStoreRepository.getLastVersion(aggregateId);
    }
}