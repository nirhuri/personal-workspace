import { Injectable } from '@nestjs/common';

@Injectable()
export class CalendarService {
    ping() {
        return { status: 'ok', module: 'calendar' };
    }
} 