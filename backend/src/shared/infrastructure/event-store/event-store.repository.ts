import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventStoreDocument } from './event-store.schema';
import { DomainEvent } from '../../domain/events/domain-event';

export interface StoredEvent {
    eventId: string;
    aggregateId: string;
    aggregateType: string;
    eventType: string;
    eventData: any;
    version: number;
    occurredOn: Date;
}

@Injectable()
export class EventStoreRepository {
    constructor(
        @InjectModel(EventStoreDocument.name)
        private readonly eventStoreModel: Model<EventStoreDocument>
    ) { }

    async save(event: DomainEvent, aggregateType: string): Promise<void> {
        console.log('Event data:', {
            eventId: event.eventId,
            aggregateId: event.aggregateId,
            version: event.version,
            occurredOn: event.occurredOn
        });

        const storedEvent = new this.eventStoreModel({
            eventId: event.eventId,
            aggregateId: event.aggregateId,
            aggregateType,
            eventType: event.getEventName(),
            eventData: event,
            version: event.version,
            occurredOn: event.occurredOn,
        });

        await storedEvent.save();
    }

    async getEvents(aggregateId: string): Promise<StoredEvent[]> {
        const events = await this.eventStoreModel
            .find({ aggregateId })
            .sort({ version: 1 })
            .exec();

        return events.map(event => ({
            eventId: event.eventId,
            aggregateId: event.aggregateId,
            aggregateType: event.aggregateType,
            eventType: event.eventType,
            eventData: event.eventData,
            version: event.version,
            occurredOn: event.occurredOn,
        }));
    }

    async getEventsByType(eventType: string): Promise<StoredEvent[]> {
        const events = await this.eventStoreModel
            .find({ eventType })
            .sort({ occurredOn: 1 })
            .exec();

        return events.map(event => ({
            eventId: event.eventId,
            aggregateId: event.aggregateId,
            aggregateType: event.aggregateType,
            eventType: event.eventType,
            eventData: event.eventData,
            version: event.version,
            occurredOn: event.occurredOn,
        }));
    }

    async getLastVersion(aggregateId: string): Promise<number> {
        const lastEvent = await this.eventStoreModel
            .findOne({ aggregateId })
            .sort({ version: -1 })
            .exec();

        return lastEvent ? lastEvent.version : 0;
    }
}