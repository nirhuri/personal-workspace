import { Controller, Post, Get, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NoteService } from '../../application/services/note.service';
import { CreateNoteDto } from '../dtos/create-note.dto';
import { Note } from '../../domain/entities/note.entity';

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NoteController {
    constructor(
        private readonly noteService: NoteService
    ) { }

    @Get('created')
    async getNotesByCreatedBy(@Req() req: any): Promise<Note[]> {
        return await this.noteService.getNotesByCreatedBy(req.user.userId);
    }

    @Get('shared')
    async getNotesSharedWith(@Req() req: any): Promise<Note[]> {
        return await this.noteService.getNotesSharedWith(req.user.userId);
    }

    @Get('accessible')
    async getAccessibleNotes(@Req() req: any): Promise<Note[]> {
        return await this.noteService.getAccessibleNotes(req.user.userId);
    }

    @Get('status/:status')
    async getNotesByStatus(@Param('status') status: string): Promise<Note[]> {
        return await this.noteService.getNotesByStatus(status);
    }

    @Get('type/:type')
    async getNotesByType(@Param('type') type: string): Promise<Note[]> {
        return await this.noteService.getNotesByType(type);
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
    async getNote(@Param('id') id: string): Promise<Note | null> {
        return await this.noteService.getNote(id);
    }

    @Post()
    async createNote(@Body() createNoteDto: CreateNoteDto, @Req() req: any): Promise<{ message: string; noteId: string }> {
        console.log('createNote')
        return await this.noteService.createNote({
            title: createNoteDto.title,
            content: createNoteDto.content,
            type: createNoteDto.type,
            sharedWith: createNoteDto.sharedWith,
            createdBy: req.user.userId
        });
    }

    @Get()
    async getNotes(@Req() req: any): Promise<Note[]> {
        return await this.noteService.getAccessibleNotes(req.user.userId);
    }
} 