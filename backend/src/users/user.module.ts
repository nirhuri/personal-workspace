import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { UserController } from './infrastructure/controllers/user.controller';
import { CreateUserHandler } from './application/commands/create-user.handler';
import { GetUserHandler } from './application/queries/get-user.handler';
import { GetUserByEmailHandler } from './application/queries/get-user-by-email.handler';
import { UserCreatedHandler } from './application/events/user-created.handler';
import { UserMongoRepository } from './infrastructure/repositories/user-mongo.repository';
import { UserDocument, UserSchema } from './infrastructure/schemas/user.schema';
import { InMemoryEventBus } from '../shared/infrastructure/messaging/in-memory-event-bus';
import { AutoEventRegistry } from '@/shared/infrastructure/messaging/auto-event-registry';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserDocument.name, schema: UserSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [
        DiscoveryService,
        CreateUserHandler,
        GetUserHandler,
        GetUserByEmailHandler,
        UserCreatedHandler,
        UserMongoRepository,
        AutoEventRegistry,
        {
            provide: 'UserRepository',
            useClass: UserMongoRepository,
        },
        {
            provide: 'EventBus',
            useClass: InMemoryEventBus,
        },
    ],
    exports: [
        'UserRepository',
        UserMongoRepository,
    ],
})
export class UserModule implements OnModuleInit {
    constructor(
        private readonly autoEventRegistry: AutoEventRegistry
    ) { }

    async onModuleInit() {
        await this.autoEventRegistry.registerAllHandlers();
    }
} 