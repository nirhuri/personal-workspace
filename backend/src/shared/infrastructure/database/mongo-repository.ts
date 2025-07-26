import { Model, Document } from 'mongoose';
import { BaseEntity } from '../../domain/entities/base.entity';

export abstract class MongoRepository<T extends BaseEntity> {
    constructor(protected readonly model: Model<Document>) { }

    async findById(id: string): Promise<T | null> {
        const document = await this.model.findById(id).exec();
        return document ? this.toEntity(document) : null;
    }

    async save(entity: T): Promise<T> {
        const document = this.toDocument(entity);
        const saved = await this.model.findByIdAndUpdate(
            entity.id,
            document,
            { new: true, upsert: true }
        ).exec();
        return this.toEntity(saved);
    }

    async delete(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id).exec();
    }

    protected abstract toEntity(document: Document): T;
    protected abstract toDocument(entity: T): any;
}