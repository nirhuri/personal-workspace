import { Controller, Post, Get, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NoteService } from '../../application/services/note.service';
import { CreateNoteDto } from '../dtos/create-note.dto';
import { Note } from '../../domain/entities/note.entity';
import { NoteDto } from '../dtos/note.dto';

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NoteController {
    constructor(
        private readonly noteService: NoteService
    ) { }

    @Get('created')
    async getNotesByCreatedBy(@Req() req: any): Promise<NoteDto[]> {
        const notes = await this.noteService.getNotesByCreatedBy(req.user.userId);
        return notes.map(note => new NoteDto(note));
    }

    @Get('shared')
    async getNotesSharedWith(@Req() req: any): Promise<NoteDto[]> {
        const notes = await this.noteService.getNotesSharedWith(req.user.userId);
        return notes.map(note => new NoteDto(note));
    }

    @Get('accessible')
    async getAccessibleNotes(@Req() req: any): Promise<NoteDto[]> {
        const notes = await this.noteService.getAccessibleNotes(req.user.userId);
        return notes.map(note => new NoteDto(note));
    }

    @Get('status/:status')
    async getNotesByStatus(@Param('status') status: string): Promise<NoteDto[]> {
        const notes = await this.noteService.getNotesByStatus(status);
        return notes.map(note => new NoteDto(note));
    }

    @Get('type/:type')
    async getNotesByType(@Param('type') type: string): Promise<NoteDto[]> {
        const notes = await this.noteService.getNotesByType(type);
        return notes.map(note => new NoteDto(note));
    }

    @Post(':id/share')
    async shareNote(
        @Param('id') id: string,
        @Body() shareNoteDto: {
            userId: string;
            action: 'ADD' | 'REMOVE';
        },
        @Req() req: any
    ): Promise<{ message: string; noteId: string }> {
        return await this.noteService.shareNote({
            noteId: id,
            userId: shareNoteDto.userId,
            action: shareNoteDto.action,
            sharedBy: req.user.userId
        });
    }

    @Put(':id')
    async updateNote(
        @Param('id') id: string,
        @Body() updateNoteDto: {
            title?: string;
            content?: string;
        },
        @Req() req: any
    ): Promise<{ message: string; noteId: string }> {
        return await this.noteService.updateNote({
            noteId: id,
            title: updateNoteDto.title,
            content: updateNoteDto.content,
            updatedBy: req.user.userId
        });
    }

    @Delete(':id')
    async deleteNote(
        @Param('id') id: string,
        @Req() req: any
    ): Promise<{ message: string; noteId: string }> {
        return await this.noteService.deleteNote({
            noteId: id,
            deletedBy: req.user.userId
        });
    }

    @Get(':id')
    async getNote(@Param('id') id: string): Promise<NoteDto | null> {
        const note = await this.noteService.getNote(id);
        return note ? new NoteDto(note) : null;
    }

    @Post()
    async createNote(
        @Body() createNoteDto: CreateNoteDto,
        @Req() req: any): Promise<{ message: string; noteId: string }> {
        return await this.noteService.createNote({
            title: createNoteDto.title,
            content: createNoteDto.content,
            type: createNoteDto.type,
            sharedWith: createNoteDto.sharedWith,
            createdBy: req.user.userId
        });
    }

    @Get()
    async getNotes(@Req() req: any): Promise<NoteDto[]> {
        const notes = await this.noteService.getAccessibleNotes(req.user.userId);
        return notes.map(note => new NoteDto(note));
    }
} 