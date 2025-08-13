import { Module } from '@nestjs/common';
import { CalendarController } from './infrastructure/controllers/calendar.controller';
import { CalendarService } from './application/services/calendar.service';

@Module({
    imports: [],
    controllers: [CalendarController],
    providers: [CalendarService],
})
export class CalendarModule { } 