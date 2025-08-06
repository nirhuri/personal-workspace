import { CommandHandler } from '@/shared/application/commands/command';
import { CreateNoteCommand } from './create-note.command';
import { Inject, Injectable } from '@nestjs/common';
import { Note, NoteType } from '@/notes/domain/entities/note.entity';
import { NoteCreatedEvent } from '@/notes/domain/events/note-created.event';
import { EventBus } from '@/shared/application/events/event-bus';
import { NoteRepository } from '@/notes/domain/repositories/note.repository';

@Injectable()
export class CreateNoteHandler implements CommandHandler<CreateNoteCommand> {
    constructor(
        @Inject('NoteRepository') private readonly noteRepository: NoteRepository,
        @Inject('EventBus') private readonly eventBus: EventBus
    ) { }

    async execute(command: CreateNoteCommand): Promise<void> {
        const note = Note.create(
            command.title,
            command.content,
            command.createdBy,
            command.type as NoteType,
            command.sharedWith
        );

        await this.noteRepository.save(note);
        await this.eventBus.publish(
            new NoteCreatedEvent(
                note.id,
                note.title,
                note.content,
                note.createdBy,
                note.type,
                note.status,
                note.sharedWith
            )
        );
    }
}