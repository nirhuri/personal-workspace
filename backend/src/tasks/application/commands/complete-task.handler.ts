import { Injectable, Inject } from '@nestjs/common';
import { CommandHandler } from '@shared/application/commands/command';
import { CompleteTaskCommand } from './complete-task.command';
import { TaskRepository } from '../../domain/repositories/tasks.repository';

@Injectable()
export class CompleteTaskHandler implements CommandHandler<CompleteTaskCommand> {
    constructor(
        @Inject('TaskRepository') private readonly taskRepository: TaskRepository
    ) { }

    async execute(command: CompleteTaskCommand): Promise<void> {
        const task = await this.taskRepository.findById(command.taskId);
        if (!task) {
            throw new Error('Task not found');
        }

        task.complete();
        await this.taskRepository.save(task);
    }
} 