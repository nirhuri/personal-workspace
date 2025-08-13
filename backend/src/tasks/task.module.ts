import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { TaskDocument, TaskSchema } from './infrastructure/schemas/task.schema';
import { TaskMongoRepository } from './infrastructure/repositories/task-mongo.repository';
import { CreateTaskHandler } from './application/commands/create-task.handler';
import { UpdateTaskHandler } from './application/commands/update-task.handler';
import { DeleteTaskHandler } from './application/commands/delete-task.handler';
import { CompleteTaskHandler } from './application/commands/complete-task.handler';
import { TaskCreatedEventHandler } from './application/events/task-created.handler';
import { TaskController } from './infrastructure/controllers/task.controller';
import { TaskService } from './application/services/task.service';
import { GetTaskHandler } from './application/queries/get-task.handler';
import { GetTasksByAssignedHandler } from './application/queries/get-tasks-by-assigned.handler';
import { GetTasksByCreatedHandler } from './application/queries/get-tasks-by-created.handler';
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
        UpdateTaskHandler,
        DeleteTaskHandler,
        CompleteTaskHandler,
        TaskCreatedEventHandler,
        TaskService,
        GetTaskHandler,
        GetTasksByAssignedHandler,
        GetTasksByCreatedHandler,
        AutoEventRegistry,
    ],
})
export class TaskModule implements OnModuleInit {
    constructor(private readonly autoEventRegistry: AutoEventRegistry) { }

    onModuleInit() {
        this.autoEventRegistry.registerAllHandlers();
    }
} 