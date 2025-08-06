import { QueryHandler } from '@/shared/application/queries/query';
import { GetTasksByAssignedQuery } from './get-tasks-by-assigned.query';
import { Inject, Injectable } from '@nestjs/common';
import { Task } from '@/tasks/domain/entities/task.entity';
import { TaskRepository } from '@/tasks/domain/repositories/tasks.repository';

@Injectable()
export class GetTasksByAssignedHandler implements QueryHandler<GetTasksByAssignedQuery, Task[]> {
    constructor(
        @Inject('TaskRepository') private readonly taskRepository: TaskRepository
    ) { }

    async execute(query: GetTasksByAssignedQuery): Promise<Task[]> {
        return await this.taskRepository.findByAssignedTo(query.userId);
    }
} 