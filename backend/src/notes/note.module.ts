import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { NoteDocument, NoteSchema } from './infrastructure/schemas/note.schema';
import { NoteMongoRepository } from './infrastructure/repositories/note-mongo.repository';
import { CreateNoteHandler } from './application/commands/create-note.handler';
import { NoteCreatedEventHandler } from './application/events/note-created.handler';
import { NoteController } from './infrastructure/controllers/note.controller';
import { NoteService } from './application/services/note.service';
import { GetNoteHandler } from './application/queries/get-note.handler';
import { GetNotesByCreatedHandler } from './application/queries/get-notes-by-created.handler';
import { GetNotesSharedWithHandler } from './application/queries/get-notes-shared-with.handler';
import { GetAccessibleNotesHandler } from './application/queries/get-accessible-notes.handler';
import { AutoEventRegistry } from '../shared/infrastructure/messaging/auto-event-registry';
import { InMemoryEventBus } from '../shared/infrastructure/messaging/in-memory-event-bus';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: NoteDocument.name, schema: NoteSchema }
        ])
    ],
    controllers: [NoteController],
    providers: [
        DiscoveryService,
        {
            provide: 'NoteRepository',
            useClass: NoteMongoRepository,
        },
        {
            provide: 'EventBus',
            useClass: InMemoryEventBus,
        },
        CreateNoteHandler,
        NoteCreatedEventHandler,
        NoteService,
        GetNoteHandler,
        GetNotesByCreatedHandler,
        GetNotesSharedWithHandler,
        GetAccessibleNotesHandler,
        AutoEventRegistry,
    ],
})
export class NoteModule implements OnModuleInit {
    constructor(private readonly autoEventRegistry: AutoEventRegistry) { }

    onModuleInit() {
        this.autoEventRegistry.registerAllHandlers();
    }
} 