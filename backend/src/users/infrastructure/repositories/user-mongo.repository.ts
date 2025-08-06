import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserDocument } from '../schemas/user.schema';
import { BaseMongoRepository } from '../../../shared/infrastructure/database/base-mongo.repository';

@Injectable()
export class UserMongoRepository extends BaseMongoRepository<User> implements UserRepository {
    constructor(
        @InjectModel(UserDocument.name)
        private readonly userModel: Model<UserDocument>
    ) {
        super(
            userModel,
            UserMongoRepository.toEntity,
            UserMongoRepository.toDocument
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        const document = await this.userModel.findOne({ email }).exec();
        return document ? UserMongoRepository.toEntity(document) : null;
    }

    async findByGoogleId(googleId: string): Promise<User | null> {
        const document = await this.userModel.findOne({ googleId }).exec();
        return document ? UserMongoRepository.toEntity(document) : null;
    }

    private static toEntity(document: UserDocument): User {
        return new User(
            document.id,
            document.email,
            document.name,
            document.googleId,
            document.picture
        );
    }

    private static toDocument(user: User): any {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            googleId: user.googleId,
            picture: user.picture,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            version: user.version,
        };
    }
}