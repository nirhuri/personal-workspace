import { BaseEntity } from '@/shared/domain/entities/base.entity';

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    URGENT = 'URGENT'
}

export class Task extends BaseEntity {
    private _status: TaskStatus;
    private _completedAt?: Date;

    constructor(
        id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly priority: TaskPriority,
        public readonly assignedTo: string,
        public readonly createdBy: string,
        status: TaskStatus,
        public readonly dueDate?: Date,
        completedAt?: Date,
    ) {
        super(id);
        this._status = status;
        this._completedAt = completedAt;
    }

    get status(): TaskStatus {
        return this._status;
    }

    private set status(status: TaskStatus) {
        this._status = status;
        this.updateVersion();
    }

    get completedAt(): Date | undefined {
        return this._completedAt;
    }

    private set completedAt(completedAt: Date | undefined) {
        this._completedAt = completedAt;
        this.updateVersion();
    }

    static create(
        title: string,
        description: string,
        priority: TaskPriority,
        assignedTo: string,
        createdBy: string,
        dueDate?: Date
    ): Task {
        return new Task(
            this.generateId(),
            title,
            description,
            priority,
            assignedTo,
            createdBy,
            TaskStatus.TODO,
            dueDate,
        );
    }

    start(): void {
        if (this.status !== TaskStatus.TODO) {
            throw new Error('Task must be in TODO status to be started');
        }
        this.status = TaskStatus.IN_PROGRESS;
        this.updateVersion();
    }

    complete(): void {
        if (this.status !== TaskStatus.IN_PROGRESS) {
            throw new Error('Task must be int progress to be completed');
        }
        this.status = TaskStatus.COMPLETED;
        this.completedAt = new Date();
        this.updateVersion();
    }

    cancel(): void {
        if (this.status === TaskStatus.COMPLETED) {
            throw new Error('Cannot cancel a completed task');
        }
        this.status = TaskStatus.CANCELLED;
        this.updateVersion();
    }

    private static generateId(): string {
        return `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    }
}

