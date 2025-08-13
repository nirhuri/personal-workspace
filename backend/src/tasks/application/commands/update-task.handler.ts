import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { CommandHandler } from '@shared/application/commands/command';
import { UpdateTaskCommand } from './update-task.command';
import { TaskRepository } from '../../domain/repositories/tasks.repository';
import { Task, TaskPriority } from '../../domain/entities/task.entity';

@Injectable()
export class UpdateTaskHandler implements CommandHandler<UpdateTaskCommand> {
    constructor(
        @Inject('TaskRepository') private readonly taskRepository: TaskRepository
    ) { }

    async execute(command: UpdateTaskCommand): Promise<void> {
        const task = await this.taskRepository.findById(command.taskId);
        if (!task) {
            throw new NotFoundException(`Task with ID ${command.taskId} not found`);
        }

        // Update task properties using setters (with built-in validation)
        if (command.title !== undefined) {
            try {
                task.title = command.title; // Validation happens in setter
            } catch (error) {
                throw new BadRequestException(`Invalid title: ${error.message}`);
            }
        }

        if (command.description !== undefined) {
            try {
                task.description = command.description; // Validation happens in setter
            } catch (error) {
                throw new BadRequestException(`Invalid description: ${error.message}`);
            }
        }

        if (command.priority !== undefined) {
            try {
                // Validate priority enum before setting
                if (!Object.values(TaskPriority).includes(command.priority as TaskPriority)) {
                    throw new Error(`Invalid priority. Must be one of: ${Object.values(TaskPriority).join(', ')}`);
                }
                task.priority = command.priority as TaskPriority; // Validation happens in setter
            } catch (error) {
                throw new BadRequestException(`Invalid priority: ${error.message}`);
            }
        }

        if (command.assignedTo !== undefined) {
            try {
                task.assignedTo = command.assignedTo; // Validation happens in setter
            } catch (error) {
                throw new BadRequestException(`Invalid assignee: ${error.message}`);
            }
        }

        if (command.dueDate !== undefined) {
            try {
                task.dueDate = command.dueDate; // Validation happens in setter
            } catch (error) {
                throw new BadRequestException(`Invalid due date: ${error.message}`);
            }
        }

        if (command.tags !== undefined) {
            try {
                task.tags = command.tags; // Validation happens in setter
            } catch (error) {
                throw new BadRequestException(`Invalid tags: ${error.message}`);
            }
        }

        // Save the updated task
        await this.taskRepository.save(task);
    }
} 