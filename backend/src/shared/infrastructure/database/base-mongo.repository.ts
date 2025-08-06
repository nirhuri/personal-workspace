import { Model, Document } from 'mongoose';
import { BaseEntity } from '../../domain/entities/base.entity';
import { BaseRepository } from '../../domain/repositories/base.repository';

export abstract class BaseMongoRepository<T extends BaseEntity> implements BaseRepository<T> {
    constructor(
        protected readonly model: Model<Document>,
        protected readonly toEntityFn: (document: Document) => T,
        protected readonly toDocumentFn: (entity: T) => any
    ) { }

    async findById(id: string): Promise<T | null> {
        const document = await this.model.findOne({ id }).exec();
        return document ? this.toEntityFn(document) : null;
    }

    async save(entity: T): Promise<T> {
        const document = this.toDocumentFn(entity);
        const saved = await this.model.findOneAndUpdate(
            { id: entity.id },
            document,
            { new: true, upsert: true }
        ).exec();
        return this.toEntityFn(saved);
    }

    async delete(id: string): Promise<void> {
        await this.model.deleteOne({ id }).exec();
    }
} 