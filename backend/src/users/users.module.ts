import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './infrastructure/controllers/user.controller';
import { CreateUserHandler } from './application/commands/create-user.handler';
import { GetUserHandler } from './application/queries/get-user.handler';
import { UserCreatedHandler } from './application/events/user-created.handler';
import { UserMongoRepository } from './infrastructure/repositories/user-mongo.repository';
import { UserDocument, UserSchema } from './infrastructure/schemas/user.schema';
import { InMemoryEventBus } from '../shared/infrastructure/messaging/in-memory-event-bus';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserDocument.name, schema: UserSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [
        CreateUserHandler,
        GetUserHandler,
        UserCreatedHandler,
        {
            provide: 'UserRepository',
            useClass: UserMongoRepository,
        },
        {
            provide: 'EventBus',
            useClass: InMemoryEventBus,
        },
    ],
})
export class UsersModule {
    constructor(
        private readonly eventBus: InMemoryEventBus,
        private readonly userCreatedHandler: UserCreatedHandler
    ) {
        // רושמים handlers כאן
        this.eventBus.registerHandler('UserCreated', this.userCreatedHandler);
    }
}