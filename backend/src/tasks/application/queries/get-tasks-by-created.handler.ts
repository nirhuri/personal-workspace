import { QueryHandler } from '@/shared/application/queries/query';
import { GetTasksByCreatedQuery } from './get-tasks-by-created.query';
import { Inject, Injectable } from '@nestjs/common';
import { Task } from '@/tasks/domain/entities/task.entity';
import { TaskRepository } from '@/tasks/domain/repositories/tasks.repository';

@Injectable()
export class GetTasksByCreatedHandler implements QueryHandler<GetTasksByCreatedQuery, Task[]> {
    constructor(
        @Inject('TaskRepository') private readonly taskRepository: TaskRepository
    ) { }

    async execute(query: GetTasksByCreatedQuery): Promise<Task[]> {
        return await this.taskRepository.findByCreatedBy(query.userId);
    }
} 