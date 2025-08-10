import { CommandHandler } from '@/shared/application/commands/command';
import { ShareNoteCommand } from './share-note.command';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Note } from '@/notes/domain/entities/note.entity';
import { NoteSharedEvent } from '@/notes/domain/events/note-shared.event';
import { EventBus } from '@/shared/application/events/event-bus';
import { NoteRepository } from '@/notes/domain/repositories/note.repository';
import { EventStoreService } from '@/shared/infrastructure/event-store/event-store.service';

@Injectable()
export class ShareNoteHandler implements CommandHandler<ShareNoteCommand> {
    constructor(
        @Inject('NoteRepository') private readonly noteRepository: NoteRepository,
        @Inject('EventBus') private readonly eventBus: EventBus,
        private readonly eventStoreService: EventStoreService
    ) { }

    async execute(command: ShareNoteCommand): Promise<void> {
        const note = await this.noteRepository.findById(command.noteId);
        if (!note) {
            throw new NotFoundException(`Note with ID ${command.noteId} not found`);
        }

        // Check if user can share the note
        if (note.createdBy !== command.sharedBy) {
            throw new Error('Only the creator can share the note');
        }

        // Perform share action
        if (command.action === 'ADD') {
            note.shareWith(command.userId);
        } else {
            note.removeShare(command.userId);
        }

        await this.noteRepository.save(note);

        const event = new NoteSharedEvent(
            note.id,
            command.userId,
            command.sharedBy,
            command.action
        );

        // Save to Event Store
        await this.eventStoreService.saveEvent(event, 'Note');

        // Publish to Event Bus
        await this.eventBus.publish(event);
    }
}