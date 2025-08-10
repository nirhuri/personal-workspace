import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventStoreDocument, EventStoreSchema } from './event-store.schema';
import { EventStoreRepository } from './event-store.repository';
import { EventStoreService } from './event-store.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: EventStoreDocument.name, schema: EventStoreSchema }
        ])
    ],
    providers: [
        EventStoreRepository,
        EventStoreService,
    ],
    exports: [
        EventStoreService,
    ],
})
export class EventStoreModule { } 