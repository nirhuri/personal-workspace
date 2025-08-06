import { Injectable, Inject } from '@nestjs/common';
import { NoteRepository } from '../../domain/repositories/note.repository';
import { Note } from '../../domain/entities/note.entity';
import { CreateNoteCommand } from '../commands/create-note.command';
import { CreateNoteHandler } from '../commands/create-note.handler';

@Injectable()
export class NoteService {
    constructor(
        @Inject('NoteRepository') private readonly noteRepository: NoteRepository,
        private readonly createNoteHandler: CreateNoteHandler
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
        return await this.noteRepository.findById(id);
    }

    async getNotesByCreatedBy(userId: string): Promise<Note[]> {
        return await this.noteRepository.findByCreatedBy(userId);
    }

    async getNotesSharedWith(userId: string): Promise<Note[]> {
        return await this.noteRepository.findBySharedWith(userId);
    }

    async getAccessibleNotes(userId: string): Promise<Note[]> {
        return await this.noteRepository.findAccessibleByUser(userId);
    }

    async getNotesByStatus(status: string): Promise<Note[]> {
        return await this.noteRepository.findByStatus(status);
    }

    async getNotesByType(type: string): Promise<Note[]> {
        return await this.noteRepository.findByType(type);
    }
}