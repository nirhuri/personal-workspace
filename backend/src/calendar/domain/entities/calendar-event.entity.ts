import { BaseEntity } from '@/shared/domain/entities/base.entity';

export enum EventStatus {
    SCHEDULED = 'SCHEDULED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export enum RecurrenceFrequency {
    NONE = 'NONE',
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY'
}

export class RecurrenceRule {
    constructor(
        public readonly frequency: RecurrenceFrequency,
        public readonly interval: number,
        public readonly endDate?: Date,
        public readonly count?: number
    ) { }
}

export class CalendarEvent extends BaseEntity {
    constructor(
        id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly startDate: Date,
        public readonly endDate: Date,
        public readonly isAllDay: boolean,
        public readonly location: string,
        public readonly attendees: string[],
        public readonly createdBy: string,
        public readonly isShared: boolean,
        public readonly color: string,
        public readonly recurrence: RecurrenceRule,
        public readonly status: EventStatus
    ) {
        super(id);
    }

    static create(
        title: string,
        description: string,
        startDate: Date,
        endDate: Date,
        isAllDay: boolean,
        location: string,
        attendees: string[],
        createdBy: string,
        isShared: boolean,
        color: string,
        recurrence: RecurrenceRule
    ): CalendarEvent {
        return new CalendarEvent(
            this.generateId(),
            title,
            description,
            startDate,
            endDate,
            isAllDay,
            location,
            attendees,
            createdBy,
            isShared,
            color,
            recurrence,
            EventStatus.SCHEDULED
        );
    }

    updateTitle(newTitle: string): void {
        // Note: We need to add updateTitle method
        this.updateVersion();
    }

    updateDescription(newDescription: string): void {
        // Note: We need to add updateDescription method
        this.updateVersion();
    }

    updateDates(newStartDate: Date, newEndDate: Date): void {
        // Note: We need to add updateDates method
        this.updateVersion();
    }

    addAttendee(attendeeId: string): void {
        // Note: We need to add addAttendee method
        this.updateVersion();
    }

    removeAttendee(attendeeId: string): void {
        // Note: We need to add removeAttendee method
        this.updateVersion();
    }

    private static generateId(): string {
        return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
} 