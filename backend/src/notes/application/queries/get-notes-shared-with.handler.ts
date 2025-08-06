import { QueryHandler } from '@/shared/application/queries/query';
import { GetNotesSharedWithQuery } from './get-notes-shared-with.query';
import { Inject, Injectable } from '@nestjs/common';
import { Note } from '@/notes/domain/entities/note.entity';
import { NoteRepository } from '@/notes/domain/repositories/note.repository';

@Injectable()
export class GetNotesSharedWithHandler implements QueryHandler<GetNotesSharedWithQuery, Note[]> {
    constructor(
        @Inject('NoteRepository') private readonly noteRepository: NoteRepository
    ) { }

    async execute(query: GetNotesSharedWithQuery): Promise<Note[]> {
        return await this.noteRepository.findBySharedWith(query.userId);
    }
}