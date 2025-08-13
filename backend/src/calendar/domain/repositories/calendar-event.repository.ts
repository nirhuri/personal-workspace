import { BaseRepository } from '@/shared/domain/repositories/base.repository';
import { CalendarEvent } from '../entities/calendar-event.entity';

export interface CalendarEventRepository extends BaseRepository<CalendarEvent> {
    findByDateRange(startDate: Date, endDate: Date): Promise<CalendarEvent[]>;
    findByCreatedBy(userId: string): Promise<CalendarEvent[]>;
    findByAttendee(userId: string): Promise<CalendarEvent[]>;
    findByStatus(status: string): Promise<CalendarEvent[]>;
} 