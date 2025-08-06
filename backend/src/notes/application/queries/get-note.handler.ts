import { QueryHandler } from '@/shared/application/queries/query';
import { GetNoteQuery } from './get-note.query';
import { Inject, Injectable } from '@nestjs/common';
import { Note } from '@/notes/domain/entities/note.entity';
import { NoteRepository } from '@/notes/domain/repositories/note.repository';

@Injectable()
export class GetNoteHandler implements QueryHandler<GetNoteQuery, Note | null> {
    constructor(
        @Inject('NoteRepository') private readonly noteRepository: NoteRepository
    ) { }

    async execute(query: GetNoteQuery): Promise<Note | null> {
        return await this.noteRepository.findById(query.noteId);
    }
}