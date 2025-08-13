import { Injectable, Inject } from '@nestjs/common';
import { CalendarEventRepository } from '../../domain/repositories/calendar-event.repository';
import { CalendarEvent, RecurrenceRule, RecurrenceFrequency } from '../../domain/entities/calendar-event.entity';

@Injectable()
export class CalendarService {
    constructor(
        @Inject('CalendarEventRepository') private readonly eventRepository: CalendarEventRepository
    ) { }

    ping() {
        return { status: 'ok', module: 'calendar' };
    }

    async createEvent(createEventDto: {
        title: string;
        description: string;
        startDate: Date;
        endDate: Date;
        isAllDay: boolean;
        location: string;
        attendees: string[];
        createdBy: string;
        isShared: boolean;
        color: string;
        recurrence?: {
            frequency: string;
            interval: number;
            endDate?: Date;
            count?: number;
        };
    }): Promise<{ message: string; eventId: string }> {
        const recurrence = createEventDto.recurrence
            ? new RecurrenceRule(
                createEventDto.recurrence.frequency as RecurrenceFrequency,
                createEventDto.recurrence.interval,
                createEventDto.recurrence.endDate,
                createEventDto.recurrence.count
            )
            : new RecurrenceRule(RecurrenceFrequency.NONE, 1);

        const event = CalendarEvent.create(
            createEventDto.title,
            createEventDto.description,
            createEventDto.startDate,
            createEventDto.endDate,
            createEventDto.isAllDay,
            createEventDto.location,
            createEventDto.attendees,
            createEventDto.createdBy,
            createEventDto.isShared,
            createEventDto.color,
            recurrence
        );

        await this.eventRepository.save(event);

        return {
            message: 'Event created successfully',
            eventId: event.id
        };
    }

    async getEvent(id: string): Promise<CalendarEvent | null> {
        return await this.eventRepository.findById(id);
    }

    async getEventsByDateRange(startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
        return await this.eventRepository.findByDateRange(startDate, endDate);
    }

    async getEventsByUser(userId: string): Promise<CalendarEvent[]> {
        const [createdEvents, attendedEvents] = await Promise.all([
            this.eventRepository.findByCreatedBy(userId),
            this.eventRepository.findByAttendee(userId)
        ]);

        // Combine and remove duplicates
        const allEvents = [...createdEvents, ...attendedEvents];
        const uniqueEvents = allEvents.filter((event, index, self) =>
            index === self.findIndex(e => e.id === event.id)
        );

        return uniqueEvents;
    }

    async updateEvent(eventId: string, updateData: {
        title?: string;
        description?: string;
        startDate?: Date;
        endDate?: Date;
        location?: string;
        color?: string;
        isShared?: boolean;
    }): Promise<{ message: string; eventId: string }> {
        const event = await this.eventRepository.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        // Update event properties if provided
        if (updateData.title) {
            event.updateTitle(updateData.title);
        }

        if (updateData.description) {
            event.updateDescription(updateData.description);
        }

        if (updateData.startDate && updateData.endDate) {
            event.updateDates(updateData.startDate, updateData.endDate);
        }

        if (updateData.location) {
            // Note: We need to add updateLocation method
        }

        if (updateData.color) {
            // Note: We need to add updateColor method
        }

        if (updateData.isShared !== undefined) {
            // Note: We need to add updateSharing method
        }

        await this.eventRepository.save(event);

        return {
            message: 'Event updated successfully',
            eventId
        };
    }

    async deleteEvent(eventId: string): Promise<{ message: string; eventId: string }> {
        const event = await this.eventRepository.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        await this.eventRepository.delete(eventId);

        return {
            message: 'Event deleted successfully',
            eventId
        };
    }

    async addAttendee(eventId: string, attendeeId: string): Promise<{ message: string; eventId: string }> {
        const event = await this.eventRepository.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        event.addAttendee(attendeeId);
        await this.eventRepository.save(event);

        return {
            message: 'Attendee added successfully',
            eventId
        };
    }

    async removeAttendee(eventId: string, attendeeId: string): Promise<{ message: string; eventId: string }> {
        const event = await this.eventRepository.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        event.removeAttendee(attendeeId);
        await this.eventRepository.save(event);

        return {
            message: 'Attendee removed successfully',
            eventId
        };
    }
} 