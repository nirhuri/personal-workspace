import { Query } from '@/shared/application/queries/query';
import { Task } from '@/tasks/domain/entities/task.entity';

export class GetTasksByAssignedQuery implements Query<Task[]> {
    constructor(
        public readonly userId: string
    ) { }
} 