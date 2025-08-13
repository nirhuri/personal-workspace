import { Controller, Get } from '@nestjs/common';
import { CalendarService } from '../../application/services/calendar.service';

@Controller('calendar')
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) { }

    @Get('ping')
    ping() {
        return this.calendarService.ping();
    }
} 