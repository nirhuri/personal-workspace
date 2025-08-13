import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarController } from './infrastructure/controllers/calendar.controller';
import { CalendarService } from './application/services/calendar.service';
import { CalendarEventDocument, CalendarEventSchema } from './infrastructure/schemas/calendar-event.schema';
import { CalendarEventMongoRepository } from './infrastructure/repositories/calendar-event-mongo.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: CalendarEventDocument.name, schema: CalendarEventSchema }
        ])
    ],
    controllers: [CalendarController],
    providers: [
        CalendarService,
        {
            provide: 'CalendarEventRepository',
            useClass: CalendarEventMongoRepository,
        },
    ],
    exports: [CalendarService],
})
export class CalendarModule { } 