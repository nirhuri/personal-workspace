import { Injectable } from '@nestjs/common';
import { NoteCreatedEvent } from '../../domain/events/note-created.event';
import { EventHandler } from '../../../shared/application/events/event-handler.decorator';

@Injectable()
@EventHandler('NoteCreated')
export class NoteCreatedEventHandler {
    async handle(event: NoteCreatedEvent): Promise<void> {
        console.log(`Note created: ${event.noteId} - ${event.title}`);
        console.log(`Type: ${event.type}, Status: ${event.status}`);
        if (event.sharedWith.length > 0) {
            console.log(`Shared with: ${event.sharedWith.join(', ')}`);
        }
    }
}