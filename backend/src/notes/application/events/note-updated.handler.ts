import { Injectable } from '@nestjs/common';
import { NoteUpdatedEvent } from '../../domain/events/note-updated.event';
import { EventHandler } from '../../../shared/application/events/event-handler.decorator';

@Injectable()
@EventHandler('NoteUpdated')
export class NoteUpdatedEventHandler {
    async handle(event: NoteUpdatedEvent): Promise<void> {
        console.log(`Note ${event.noteId} updated by ${event.updatedBy}`);
        if (event.title) console.log(`New title: ${event.title}`);
        if (event.content) console.log(`Content updated`);
        console.log(`New version: ${event.version}`);
    }
}