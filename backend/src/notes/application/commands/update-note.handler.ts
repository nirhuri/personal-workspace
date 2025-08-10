import { CommandHandler } from '@/shared/application/commands/command';
import { UpdateNoteCommand } from './update-note.command';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Note } from '@/notes/domain/entities/note.entity';
import { NoteUpdatedEvent } from '@/notes/domain/events/note-updated.event';
import { EventBus } from '@/shared/application/events/event-bus';
import { NoteRepository } from '@/notes/domain/repositories/note.repository';
import { EventStoreService } from '@/shared/infrastructure/event-store/event-store.service';

@Injectable()
export class UpdateNoteHandler implements CommandHandler<UpdateNoteCommand> {
    constructor(
        @Inject('NoteRepository') private readonly noteRepository: NoteRepository,
        @Inject('EventBus') private readonly eventBus: EventBus,
        private readonly eventStoreService: EventStoreService
    ) { }

    async execute(command: UpdateNoteCommand): Promise<void> {
        const note = await this.noteRepository.findById(command.noteId);
        if (!note) {
            throw new NotFoundException(`Note with ID ${command.noteId} not found`);
        }

        // Check if user can update the note
        if (!note.canAccess(command.updatedBy)) {
            throw new Error('User does not have permission to update this note');
        }

        // Update note properties
        if (command.title !== undefined) {
            note.updateTitle(command.title);
        }
        if (command.content !== undefined) {
            note.updateContent(command.content);
        }

        await this.noteRepository.save(note);

        const event = new NoteUpdatedEvent(
            note.id,
            command.updatedBy,
            note.version,
            command.title,
            command.content
        );

        // Save to Event Store
        await this.eventStoreService.saveEvent(event, 'Note');

        // Publish to Event Bus
        await this.eventBus.publish(event);
    }
}