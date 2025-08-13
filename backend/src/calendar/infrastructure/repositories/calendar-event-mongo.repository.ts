import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CalendarEventRepository } from '../../domain/repositories/calendar-event.repository';
import { CalendarEvent } from '../../domain/entities/calendar-event.entity';
import { CalendarEventDocument } from '../schemas/calendar-event.schema';
import { BaseMongoRepository } from '@/shared/infrastructure/database/base-mongo.repository';

@Injectable()
export class CalendarEventMongoRepository extends BaseMongoRepository<CalendarEvent> implements CalendarEventRepository {
    constructor(
        @InjectModel(CalendarEventDocument.name)
        private readonly eventModel: Model<CalendarEventDocument>
    ) {
        super(
            eventModel,
            CalendarEventMongoRepository.toEntity,
            CalendarEventMongoRepository.toDocument
        );
    }

    async findByDateRange(startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
        const documents = await this.eventModel.find({
            startDate: { $gte: startDate },
            endDate: { $lte: endDate }
        }).exec();

        return documents.map(doc => CalendarEventMongoRepository.toEntity(doc));
    }

    async findByCreatedBy(userId: string): Promise<CalendarEvent[]> {
        const documents = await this.eventModel.find({ createdBy: userId }).exec();
        return documents.map(doc => CalendarEventMongoRepository.toEntity(doc));
    }

    async findByAttendee(userId: string): Promise<CalendarEvent[]> {
        const documents = await this.eventModel.find({ attendees: userId }).exec();
        return documents.map(doc => CalendarEventMongoRepository.toEntity(doc));
    }

    async findByStatus(status: string): Promise<CalendarEvent[]> {
        const documents = await this.eventModel.find({ status }).exec();
        return documents.map(doc => CalendarEventMongoRepository.toEntity(doc));
    }

    private static toEntity(document: CalendarEventDocument): CalendarEvent {
        // Note: This is a simplified conversion
        // In a real implementation, you'd need to handle the recurrence rule properly
        return new CalendarEvent(
            document.id,
            document.title,
            document.description,
            document.startDate,
            document.endDate,
            document.isAllDay,
            document.location,
            document.attendees,
            document.createdBy,
            document.isShared,
            document.color,
            document.recurrence as any, // Simplified for now
            document.status as any
        );
    }

    private static toDocument(event: CalendarEvent): any {
        return {
            id: event.id,
            title: event.title,
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
            isAllDay: event.isAllDay,
            location: event.location,
            attendees: event.attendees,
            createdBy: event.createdBy,
            isShared: event.isShared,
            color: event.color,
            recurrence: event.recurrence,
            status: event.status,
            createdAt: event.createdAt,
            updatedAt: event.updatedAt,
            version: event.version,
        };
    }
} 