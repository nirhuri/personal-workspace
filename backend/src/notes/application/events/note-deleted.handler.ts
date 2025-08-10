import { Injectable } from '@nestjs/common';
import { NoteDeletedEvent } from '../../domain/events/note-deleted.event';
import { EventHandler } from '../../../shared/application/events/event-handler.decorator';

@Injectable()
@EventHandler('NoteDeleted')
export class NoteDeletedEventHandler {
    async handle(event: NoteDeletedEvent): Promise<void> {
        console.log(`Note ${event.noteId} deleted by ${event.deletedBy}`);
        console.log(`Deletion timestamp: ${event.occurredOn}`);
    }
}