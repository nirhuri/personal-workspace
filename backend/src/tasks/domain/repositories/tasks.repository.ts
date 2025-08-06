import { Task } from '../entities/task.entity';

export interface TaskRepository {
    findById(id: string): Promise<Task | null>;
    findByAssignedTo(userId: string): Promise<Task[]>;
    findByCreatedBy(userId: string): Promise<Task[]>;
    findByStatus(status: string): Promise<Task[]>;
    save(task: Task): Promise<Task>;
    delete(id: string): Promise<void>;
}