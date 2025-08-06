import { Query } from '@/shared/application/queries/query';
import { Task } from '@/tasks/domain/entities/task.entity';

export class GetTasksByCreatedQuery implements Query<Task[]> {
    constructor(
        public readonly userId: string
    ) { }
} 