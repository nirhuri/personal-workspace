import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CalendarService } from '../../application/services/calendar.service';

@Controller('calendar')
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) { }

    @Get('ping')
    ping() {
        return this.calendarService.ping();
    }

    @Post('events')
    async createEvent(@Body() createEventDto: {
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
    }) {
        return await this.calendarService.createEvent(createEventDto);
    }

    @Get('events/:id')
    async getEvent(@Param('id') id: string) {
        return await this.calendarService.getEvent(id);
    }

    @Get('events')
    async getEvents(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
        @Query('userId') userId: string
    ) {
        if (startDate && endDate) {
            return await this.calendarService.getEventsByDateRange(
                new Date(startDate),
                new Date(endDate)
            );
        }

        if (userId) {
            return await this.calendarService.getEventsByUser(userId);
        }

        return [];
    }

    @Put('events/:id')
    async updateEvent(
        @Param('id') id: string,
        @Body() updateData: {
            title?: string;
            description?: string;
            startDate?: Date;
            endDate?: Date;
            location?: string;
            color?: string;
            isShared?: boolean;
        }
    ) {
        return await this.calendarService.updateEvent(id, updateData);
    }

    @Delete('events/:id')
    async deleteEvent(@Param('id') id: string) {
        return await this.calendarService.deleteEvent(id);
    }

    @Post('events/:id/attendees')
    async addAttendee(
        @Param('id') id: string,
        @Body() body: { attendeeId: string }
    ) {
        return await this.calendarService.addAttendee(id, body.attendeeId);
    }

    @Delete('events/:id/attendees/:attendeeId')
    async removeAttendee(
        @Param('id') id: string,
        @Param('attendeeId') attendeeId: string
    ) {
        return await this.calendarService.removeAttendee(id, attendeeId);
    }
} 