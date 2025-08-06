import { Injectable, Inject } from '@nestjs/common';
import { TaskRepository } from '../../domain/repositories/tasks.repository';
import { Task } from '../../domain/entities/task.entity';
import { CreateTaskCommand } from '../commands/create-task.command';
import { CreateTaskHandler } from '../commands/create-task.handler';
import { GetTaskQuery } from '../queries/get-task.query';
import { GetTaskHandler } from '../queries/get-task.handler';
import { GetTasksByAssignedQuery } from '../queries/get-tasks-by-assigned.query';
import { GetTasksByAssignedHandler } from '../queries/get-tasks-by-assigned.handler';
import { GetTasksByCreatedQuery } from '../queries/get-tasks-by-created.query';
import { GetTasksByCreatedHandler } from '../queries/get-tasks-by-created.handler';

@Injectable()
export class TaskService {
    constructor(
        @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
        private readonly createTaskHandler: CreateTaskHandler,
        private readonly getTaskHandler: GetTaskHandler,
        private readonly getTasksByAssignedHandler: GetTasksByAssignedHandler,
        private readonly getTasksByCreatedHandler: GetTasksByCreatedHandler
    ) { }

    async createTask(createTaskDto: {
        title: string;
        description: string;
        priority: string;
        assignedTo: string;
        createdBy: string;
        dueDate?: Date;
    }): Promise<{ message: string; taskId: string }> {
        const command = new CreateTaskCommand(
            createTaskDto.title,
            createTaskDto.description,
            createTaskDto.priority,
            createTaskDto.assignedTo,
            createTaskDto.createdBy,
            createTaskDto.dueDate
        );

        await this.createTaskHandler.execute(command);

        return {
            message: 'Task created successfully',
            taskId: command.commandId
        };
    }

    async getTask(id: string): Promise<Task | null> {
        const query = new GetTaskQuery(id);
        return await this.getTaskHandler.execute(query);
    }

    async getTasksByAssignedTo(userId: string): Promise<Task[]> {
        const query = new GetTasksByAssignedQuery(userId);
        return await this.getTasksByAssignedHandler.execute(query);
    }

    async getTasksByCreatedBy(userId: string): Promise<Task[]> {
        const query = new GetTasksByCreatedQuery(userId);
        return await this.getTasksByCreatedHandler.execute(query);
    }
} 