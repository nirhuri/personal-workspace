import { Query } from '@/shared/application/queries/query';
import { Task } from '@/tasks/domain/entities/task.entity';

export class GetTaskQuery implements Query<Task | null> {
    constructor(
        public readonly taskId: string
    ) { }
} 