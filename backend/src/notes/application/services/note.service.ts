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
import { UpdateNoteHandler } from '../commands/update-note.handler';
import { DeleteNoteHandler } from '../commands/delete-note.handler';
import { ShareNoteHandler } from '../commands/share-note.handler';
import { UpdateNoteCommand } from '../commands/update-note.command';
import { DeleteNoteCommand } from '../commands/delete-note.command';
import { ShareNoteCommand } from '../commands/share-note.command';

@Injectable()
export class NoteService {
    constructor(
        @Inject('NoteRepository') private readonly noteRepository: NoteRepository,
        private readonly createNoteHandler: CreateNoteHandler,
        private readonly updateNoteHandler: UpdateNoteHandler,
        private readonly deleteNoteHandler: DeleteNoteHandler,
        private readonly shareNoteHandler: ShareNoteHandler,
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

    async updateNote(updateNoteDto: {
        noteId: string;
        title?: string;
        content?: string;
        updatedBy: string;
    }): Promise<{ message: string; noteId: string }> {
        const command = new UpdateNoteCommand(
            updateNoteDto.noteId,
            updateNoteDto.updatedBy,
            updateNoteDto.title,
            updateNoteDto.content
        );

        await this.updateNoteHandler.execute(command);

        return {
            message: 'Note updated successfully',
            noteId: updateNoteDto.noteId
        };
    }

    async deleteNote(deleteNoteDto: {
        noteId: string;
        deletedBy: string;
    }): Promise<{ message: string; noteId: string }> {
        const command = new DeleteNoteCommand(
            deleteNoteDto.noteId,
            deleteNoteDto.deletedBy
        );

        await this.deleteNoteHandler.execute(command);

        return {
            message: 'Note deleted successfully',
            noteId: deleteNoteDto.noteId
        };
    }

    async shareNote(shareNoteDto: {
        noteId: string;
        userId: string;
        sharedBy: string;
        action: 'ADD' | 'REMOVE';
    }): Promise<{ message: string; noteId: string }> {
        const command = new ShareNoteCommand(
            shareNoteDto.noteId,
            shareNoteDto.userId,
            shareNoteDto.sharedBy,
            shareNoteDto.action
        );

        await this.shareNoteHandler.execute(command);

        return {
            message: `Note ${shareNoteDto.action === 'ADD' ? 'shared with' : 'unshared from'} user successfully`,
            noteId: shareNoteDto.noteId
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