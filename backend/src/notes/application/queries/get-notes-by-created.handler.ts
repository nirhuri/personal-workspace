import { QueryHandler } from '@/shared/application/queries/query';
import { GetNotesByCreatedQuery } from './get-notes-by-created.query';
import { Inject, Injectable } from '@nestjs/common';
import { Note } from '@/notes/domain/entities/note.entity';
import { NoteRepository } from '@/notes/domain/repositories/note.repository';

@Injectable()
export class GetNotesByCreatedHandler implements QueryHandler<GetNotesByCreatedQuery, Note[]> {
    constructor(
        @Inject('NoteRepository') private readonly noteRepository: NoteRepository
    ) { }

    async execute(query: GetNotesByCreatedQuery): Promise<Note[]> {
        return await this.noteRepository.findByCreatedBy(query.userId);
    }
}