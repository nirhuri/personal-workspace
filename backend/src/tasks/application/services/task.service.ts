import { Injectable, Inject } from '@nestjs/common';
import { TaskRepository } from '../../domain/repositories/tasks.repository';
import { Task } from '../../domain/entities/task.entity';
import { CreateTaskCommand } from '../commands/create-task.command';
import { CreateTaskHandler } from '../commands/create-task.handler';
import { UpdateTaskCommand } from '../commands/update-task.command';
import { UpdateTaskHandler } from '../commands/update-task.handler';
import { DeleteTaskCommand } from '../commands/delete-task.command';
import { DeleteTaskHandler } from '../commands/delete-task.handler';
import { CompleteTaskCommand } from '../commands/complete-task.command';
import { CompleteTaskHandler } from '../commands/complete-task.handler';
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
        private readonly updateTaskHandler: UpdateTaskHandler,
        private readonly deleteTaskHandler: DeleteTaskHandler,
        private readonly completeTaskHandler: CompleteTaskHandler,
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

    async updateTask(updateTaskDto: {
        taskId: string;
        updatedBy: string;
        title?: string;
        description?: string;
        priority?: string;
        assignedTo?: string;
        dueDate?: Date;
        tags?: string[];
    }): Promise<{ message: string; taskId: string }> {
        const command = new UpdateTaskCommand(
            updateTaskDto.taskId,
            updateTaskDto.updatedBy,
            updateTaskDto.title,
            updateTaskDto.description,
            updateTaskDto.priority,
            updateTaskDto.assignedTo,
            updateTaskDto.dueDate,
            updateTaskDto.tags
        );

        await this.updateTaskHandler.execute(command);

        return {
            message: 'Task updated successfully',
            taskId: updateTaskDto.taskId
        };
    }

    async deleteTask(deleteTaskDto: {
        taskId: string;
        deletedBy: string;
    }): Promise<{ message: string; taskId: string }> {
        const command = new DeleteTaskCommand(
            deleteTaskDto.taskId,
            deleteTaskDto.deletedBy
        );

        await this.deleteTaskHandler.execute(command);

        return {
            message: 'Task deleted successfully',
            taskId: deleteTaskDto.taskId
        };
    }

    async completeTask(completeTaskDto: {
        taskId: string;
        completedBy: string;
    }): Promise<{ message: string; taskId: string }> {
        const command = new CompleteTaskCommand(
            completeTaskDto.taskId,
            completeTaskDto.completedBy
        );

        await this.completeTaskHandler.execute(command);

        return {
            message: 'Task completed successfully',
            taskId: completeTaskDto.taskId
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