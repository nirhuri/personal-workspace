import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoteRepository } from '../../domain/repositories/note.repository';
import { Note, NoteStatus, NoteType } from '../../domain/entities/note.entity';
import { NoteDocument } from '../schemas/note.schema';
import { BaseMongoRepository } from '../../../shared/infrastructure/database/base-mongo.repository';

@Injectable()
export class NoteMongoRepository extends BaseMongoRepository<Note> implements NoteRepository {
    constructor(
        @InjectModel(NoteDocument.name)
        private readonly noteModel: Model<NoteDocument>
    ) {
        super(
            noteModel,
            NoteMongoRepository.toEntity,
            NoteMongoRepository.toDocument
        );
    }

    async findByCreatedBy(userId: string): Promise<Note[]> {
        const documents = await this.noteModel.find({ createdBy: userId }).exec();
        return documents.map(doc => NoteMongoRepository.toEntity(doc));
    }

    async findBySharedWith(userId: string): Promise<Note[]> {
        const documents = await this.noteModel.find({ sharedWith: userId }).exec();
        return documents.map(doc => NoteMongoRepository.toEntity(doc));
    }

    async findByStatus(status: string): Promise<Note[]> {
        const documents = await this.noteModel.find({ status }).exec();
        return documents.map(doc => NoteMongoRepository.toEntity(doc));
    }

    async findByType(type: string): Promise<Note[]> {
        const documents = await this.noteModel.find({ type }).exec();
        return documents.map(doc => NoteMongoRepository.toEntity(doc));
    }

    async findAccessibleByUser(userId: string): Promise<Note[]> {
        const documents = await this.noteModel.find({
            $or: [
                { createdBy: userId },
                { sharedWith: userId }
            ]
        }).exec();
        return documents.map(doc => NoteMongoRepository.toEntity(doc));
    }

    private static toEntity(document: NoteDocument): Note {
        return new Note(
            document.id,
            document.createdBy,
            document.title,
            document.content,
            document.type as NoteType,
            document.status as NoteStatus,
            document.sharedWith
        );
    }

    private static toDocument(note: Note): any {
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            status: note.status,
            type: note.type,
            createdBy: note.createdBy,
            sharedWith: note.sharedWith,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
            version: note.version,
        };
    }
} 