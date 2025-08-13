import { Injectable, Inject } from '@nestjs/common';
import { CommandHandler } from '@shared/application/commands/command';
import { DeleteTaskCommand } from './delete-task.command';
import { TaskRepository } from '../../domain/repositories/tasks.repository';

@Injectable()
export class DeleteTaskHandler implements CommandHandler<DeleteTaskCommand> {
    constructor(
        @Inject('TaskRepository') private readonly taskRepository: TaskRepository
    ) { }

    async execute(command: DeleteTaskCommand): Promise<void> {
        const task = await this.taskRepository.findById(command.taskId);
        if (!task) {
            throw new Error('Task not found');
        }

        await this.taskRepository.delete(command.taskId);
    }
} 