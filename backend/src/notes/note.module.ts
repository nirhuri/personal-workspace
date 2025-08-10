import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { NoteDocument, NoteSchema } from './infrastructure/schemas/note.schema';
import { NoteMongoRepository } from './infrastructure/repositories/note-mongo.repository';
import { CreateNoteHandler } from './application/commands/create-note.handler';
import { UpdateNoteHandler } from './application/commands/update-note.handler';
import { DeleteNoteHandler } from './application/commands/delete-note.handler';
import { ShareNoteHandler } from './application/commands/share-note.handler';
import { NoteCreatedEventHandler } from './application/events/note-created.handler';
import { NoteUpdatedEventHandler } from './application/events/note-updated.handler';
import { NoteDeletedEventHandler } from './application/events/note-deleted.handler';
import { NoteSharedEventHandler } from './application/events/note-shared.handler';
import { NoteController } from './infrastructure/controllers/note.controller';
import { NoteService } from './application/services/note.service';
import { GetNoteHandler } from './application/queries/get-note.handler';
import { GetNotesByCreatedHandler } from './application/queries/get-notes-by-created.handler';
import { GetNotesSharedWithHandler } from './application/queries/get-notes-shared-with.handler';
import { GetAccessibleNotesHandler } from './application/queries/get-accessible-notes.handler';
import { AutoEventRegistry } from '../shared/infrastructure/messaging/auto-event-registry';
import { InMemoryEventBus } from '../shared/infrastructure/messaging/in-memory-event-bus';
import { EventStoreModule } from '../shared/infrastructure/event-store/event-store.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: NoteDocument.name, schema: NoteSchema }
        ]),
        EventStoreModule,
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
        // Commands
        CreateNoteHandler,
        UpdateNoteHandler,
        DeleteNoteHandler,
        ShareNoteHandler,
        // Events
        NoteCreatedEventHandler,
        NoteUpdatedEventHandler,
        NoteDeletedEventHandler,
        NoteSharedEventHandler,
        // Queries
        GetNoteHandler,
        GetNotesByCreatedHandler,
        GetNotesSharedWithHandler,
        GetAccessibleNotesHandler,
        // Services
        NoteService,
        AutoEventRegistry,
    ],
})
export class NoteModule implements OnModuleInit {
    constructor(private readonly autoEventRegistry: AutoEventRegistry) { }

    onModuleInit() {
        this.autoEventRegistry.registerAllHandlers();
    }
}