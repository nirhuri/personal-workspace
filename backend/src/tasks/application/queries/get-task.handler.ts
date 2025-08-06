import { QueryHandler } from '@/shared/application/queries/query';
import { GetTaskQuery } from './get-task.query';
import { Inject, Injectable } from '@nestjs/common';
import { Task } from '@/tasks/domain/entities/task.entity';
import { TaskRepository } from '@/tasks/domain/repositories/tasks.repository';

@Injectable()
export class GetTaskHandler implements QueryHandler<GetTaskQuery, Task | null> {
    constructor(
        @Inject('TaskRepository') private readonly taskRepository: TaskRepository
    ) { }

    async execute(query: GetTaskQuery): Promise<Task | null> {
        return await this.taskRepository.findById(query.taskId);
    }
} 