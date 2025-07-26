import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserDocument } from '../schemas/user.schema';
import { MongoRepository } from '../../../shared/infrastructure/database/mongo-repository';

@Injectable()
export class UserMongoRepository implements UserRepository {
    constructor(
        @InjectModel(UserDocument.name)
        private readonly userModel: Model<UserDocument>
    ) { }

    async findById(id: string): Promise<User | null> {
        const document = await this.userModel.findOne({ id }).exec();
        return document ? this.toEntity(document) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const document = await this.userModel.findOne({ email }).exec();
        return document ? this.toEntity(document) : null;
    }

    async findByGoogleId(googleId: string): Promise<User | null> {
        const document = await this.userModel.findOne({ googleId }).exec();
        return document ? this.toEntity(document) : null;
    }

    async save(entity: User): Promise<User> {
        const document = this.toDocument(entity);
        const saved = await this.userModel.findOneAndUpdate(
            { id: entity.id },
            document,
            { new: true, upsert: true }
        ).exec();
        return this.toEntity(saved);
    }

    async delete(id: string): Promise<void> {
        await this.userModel.deleteOne({ id }).exec();
    }

    protected toEntity(document: UserDocument): User {
        return new User(
            document.id,
            document.email,
            document.name,
            document.googleId,
            document.picture
        );
    }

    protected toDocument(entity: User): any {
        return {
            id: entity.id,
            email: entity.email,
            name: entity.name,
            googleId: entity.googleId,
            picture: entity.picture,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            version: entity.version,
        };
    }
}