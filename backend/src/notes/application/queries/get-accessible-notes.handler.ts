import { QueryHandler } from '@/shared/application/queries/query';
import { GetAccessibleNotesQuery } from './get-accessible-notes.query';
import { Inject, Injectable } from '@nestjs/common';
import { Note } from '@/notes/domain/entities/note.entity';
import { NoteRepository } from '@/notes/domain/repositories/note.repository';

@Injectable()
export class GetAccessibleNotesHandler implements QueryHandler<GetAccessibleNotesQuery, Note[]> {
    constructor(
        @Inject('NoteRepository') private readonly noteRepository: NoteRepository
    ) { }

    async execute(query: GetAccessibleNotesQuery): Promise<Note[]> {
        return await this.noteRepository.findAccessibleByUser(query.userId);
    }
}