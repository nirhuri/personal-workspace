import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { NoteService } from '../../application/services/note.service';
import { CreateNoteDto } from '../dtos/create-note.dto';
import { Note } from '../../domain/entities/note.entity';

@Controller('notes')
export class NoteController {
    constructor(
        private readonly noteService: NoteService
    ) { }

    @Post()
    async createNote(@Body() createNoteDto: CreateNoteDto): Promise<{ message: string; noteId: string }> {
        return await this.noteService.createNote(createNoteDto);
    }

    @Get(':id')
    async getNote(@Param('id') id: string): Promise<Note | null> {
        return await this.noteService.getNote(id);
    }

    @Get('created/:userId')
    async getNotesByCreatedBy(@Param('userId') userId: string): Promise<Note[]> {
        return await this.noteService.getNotesByCreatedBy(userId);
    }

    @Get('shared/:userId')
    async getNotesSharedWith(@Param('userId') userId: string): Promise<Note[]> {
        return await this.noteService.getNotesSharedWith(userId);
    }

    @Get('accessible/:userId')
    async getAccessibleNotes(@Param('userId') userId: string): Promise<Note[]> {
        return await this.noteService.getAccessibleNotes(userId);
    }

    @Get('status/:status')
    async getNotesByStatus(@Param('status') status: string): Promise<Note[]> {
        return await this.noteService.getNotesByStatus(status);
    }

    @Get('type/:type')
    async getNotesByType(@Param('type') type: string): Promise<Note[]> {
        return await this.noteService.getNotesByType(type);
    }
} 