import { Injectable, Inject } from '@nestjs/common';
import { TaskRepository } from '../../domain/repositories/tasks.repository';
import { Task } from '../../domain/entities/task.entity';
import { CreateTaskCommand } from '../commands/create-task.command';
import { CreateTaskHandler } from '../commands/create-task.handler';

@Injectable()
export class TaskService {
    constructor(
        @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
        private readonly createTaskHandler: CreateTaskHandler
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
        return await this.taskRepository.findById(id);
    }

    async getTasksByAssignedTo(userId: string): Promise<Task[]> {
        return await this.taskRepository.findByAssignedTo(userId);
    }

    async getTasksByCreatedBy(userId: string): Promise<Task[]> {
        return await this.taskRepository.findByCreatedBy(userId);
    }
} 