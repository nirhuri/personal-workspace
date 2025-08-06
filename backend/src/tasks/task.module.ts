import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { TaskDocument, TaskSchema } from './infrastructure/schemas/task.schema';
import { TaskMongoRepository } from './infrastructure/repositories/task-mongo.repository';
import { CreateTaskHandler } from './application/commands/create-task.handler';
import { TaskCreatedEventHandler } from './application/events/task-created.handler';
import { TaskController } from './infrastructure/controllers/task.controller';
import { TaskService } from './application/services/task.service';
import { AutoEventRegistry } from '../shared/infrastructure/messaging/auto-event-registry';
import { InMemoryEventBus } from '../shared/infrastructure/messaging/in-memory-event-bus';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TaskDocument.name, schema: TaskSchema }
        ])
    ],
    controllers: [TaskController],
    providers: [
        DiscoveryService,
        {
            provide: 'TaskRepository',
            useClass: TaskMongoRepository,
        },
        {
            provide: 'EventBus',
            useClass: InMemoryEventBus,
        },
        CreateTaskHandler,
        TaskCreatedEventHandler,
        TaskService,
        AutoEventRegistry,
    ],
})
export class TaskModule implements OnModuleInit {
    constructor(private readonly autoEventRegistry: AutoEventRegistry) { }

    onModuleInit() {
        this.autoEventRegistry.registerAllHandlers();
    }
} 