import { CommandHandler } from '@/shared/application/commands/command';
import { CreateNoteCommand } from './create-note.command';
import { Inject, Injectable } from '@nestjs/common';
import { Note, NoteType } from '@/notes/domain/entities/note.entity';
import { NoteCreatedEvent } from '@/notes/domain/events/note-created.event';
import { EventBus } from '@/shared/application/events/event-bus';
import { NoteRepository } from '@/notes/domain/repositories/note.repository';
import { EventStoreService } from '@/shared/infrastructure/event-store/event-store.service';

@Injectable()
export class CreateNoteHandler implements CommandHandler<CreateNoteCommand> {
    constructor(
        @Inject('NoteRepository') private readonly noteRepository: NoteRepository,
        @Inject('EventBus') private readonly eventBus: EventBus,
        private readonly eventStoreService: EventStoreService
    ) { }

    async execute(command: CreateNoteCommand): Promise<void> {
        const note = Note.create(
            command.createdBy,
            command.title,
            command.content,
            command.type as NoteType,
            command.sharedWith
        );

        await this.noteRepository.save(note);

        const event = new NoteCreatedEvent(
            note.id,
            note.title,
            note.content,
            note.createdBy,
            note.type,
            note.status,
            note.sharedWith
        );

        // Save to Event Store
        await this.eventStoreService.saveEvent(event, 'Note');

        // Publish to Event Bus
        await this.eventBus.publish(event);
    }
}