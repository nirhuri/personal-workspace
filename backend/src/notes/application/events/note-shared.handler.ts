import { Injectable } from '@nestjs/common';
import { NoteSharedEvent } from '../../domain/events/note-shared.event';
import { EventHandler } from '../../../shared/application/events/event-handler.decorator';

@Injectable()
@EventHandler('NoteShared')
export class NoteSharedEventHandler {
    async handle(event: NoteSharedEvent): Promise<void> {
        console.log(`Note ${event.noteId} ${event.action === 'ADD' ? 'shared with' : 'unshared from'} user ${event.userId}`);
        console.log(`Action performed by: ${event.sharedBy}`);
    }
}