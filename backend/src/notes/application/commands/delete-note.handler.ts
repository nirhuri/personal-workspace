import { CommandHandler } from '@/shared/application/commands/command';
import { DeleteNoteCommand } from './delete-note.command';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Note } from '@/notes/domain/entities/note.entity';
import { NoteDeletedEvent } from '@/notes/domain/events/note-deleted.event';
import { EventBus } from '@/shared/application/events/event-bus';
import { NoteRepository } from '@/notes/domain/repositories/note.repository';
import { EventStoreService } from '@/shared/infrastructure/event-store/event-store.service';

@Injectable()
export class DeleteNoteHandler implements CommandHandler<DeleteNoteCommand> {
    constructor(
        @Inject('NoteRepository') private readonly noteRepository: NoteRepository,
        @Inject('EventBus') private readonly eventBus: EventBus,
        private readonly eventStoreService: EventStoreService
    ) { }

    async execute(command: DeleteNoteCommand): Promise<void> {
        const note = await this.noteRepository.findById(command.noteId);
        if (!note) {
            throw new NotFoundException(`Note with ID ${command.noteId} not found`);
        }

        // Check if user can delete the note
        if (note.createdBy !== command.deletedBy) {
            throw new Error('Only the creator can delete the note');
        }

        await this.noteRepository.delete(command.noteId);

        const event = new NoteDeletedEvent(
            command.noteId,
            command.deletedBy
        );

        // Save to Event Store
        await this.eventStoreService.saveEvent(event, 'Note');

        // Publish to Event Bus
        await this.eventBus.publish(event);
    }
}