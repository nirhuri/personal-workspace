import { Injectable, Inject } from '@nestjs/common';
import { NoteRepository } from '../../domain/repositories/note.repository';
import { Note } from '../../domain/entities/note.entity';
import { CreateNoteCommand } from '../commands/create-note.command';
import { CreateNoteHandler } from '../commands/create-note.handler';
import { GetNoteQuery } from '../queries/get-note.query';
import { GetNoteHandler } from '../queries/get-note.handler';
import { GetNotesByCreatedQuery } from '../queries/get-notes-by-created.query';
import { GetNotesByCreatedHandler } from '../queries/get-notes-by-created.handler';
import { GetNotesSharedWithQuery } from '../queries/get-notes-shared-with.query';
import { GetNotesSharedWithHandler } from '../queries/get-notes-shared-with.handler';
import { GetAccessibleNotesQuery } from '../queries/get-accessible-notes.query';
import { GetAccessibleNotesHandler } from '../queries/get-accessible-notes.handler';

@Injectable()
export class NoteService {
    constructor(
        @Inject('NoteRepository') private readonly noteRepository: NoteRepository,
        private readonly createNoteHandler: CreateNoteHandler,
        private readonly getNoteHandler: GetNoteHandler,
        private readonly getNotesByCreatedHandler: GetNotesByCreatedHandler,
        private readonly getNotesSharedWithHandler: GetNotesSharedWithHandler,
        private readonly getAccessibleNotesHandler: GetAccessibleNotesHandler
    ) { }

    async createNote(createNoteDto: {
        title: string;
        content: string;
        createdBy: string;
        type: string;
        sharedWith?: string[];
    }): Promise<{ message: string; noteId: string }> {
        const command = new CreateNoteCommand(
            createNoteDto.title,
            createNoteDto.content,
            createNoteDto.createdBy,
            createNoteDto.type,
            createNoteDto.sharedWith || []
        );

        await this.createNoteHandler.execute(command);

        return {
            message: 'Note created successfully',
            noteId: command.commandId
        };
    }

    async getNote(id: string): Promise<Note | null> {
        const query = new GetNoteQuery(id);
        return await this.getNoteHandler.execute(query);
    }

    async getNotesByCreatedBy(userId: string): Promise<Note[]> {
        const query = new GetNotesByCreatedQuery(userId);
        return await this.getNotesByCreatedHandler.execute(query);
    }

    async getNotesSharedWith(userId: string): Promise<Note[]> {
        const query = new GetNotesSharedWithQuery(userId);
        return await this.getNotesSharedWithHandler.execute(query);
    }

    async getAccessibleNotes(userId: string): Promise<Note[]> {
        const query = new GetAccessibleNotesQuery(userId);
        return await this.getAccessibleNotesHandler.execute(query);
    }

    async getNotesByStatus(status: string): Promise<Note[]> {
        return await this.noteRepository.findByStatus(status);
    }

    async getNotesByType(type: string): Promise<Note[]> {
        return await this.noteRepository.findByType(type);
    }
}