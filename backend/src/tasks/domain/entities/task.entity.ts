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
    private _title: string;
    private _description: string;
    private _priority: TaskPriority;
    private _assignedTo: string;
    private _createdBy: string;
    private _status: TaskStatus;
    private _dueDate?: Date;
    private _completedAt?: Date;
    private _tags: string[];

    constructor(
        id: string,
        title: string,
        description: string,
        priority: TaskPriority,
        assignedTo: string,
        createdBy: string,
        status: TaskStatus,
        dueDate?: Date,
        completedAt?: Date,
        tags: string[] = []
    ) {
        super(id);
        this._title = title;
        this._description = description;
        this._priority = priority;
        this._assignedTo = assignedTo;
        this._createdBy = createdBy;
        this._status = status;
        this._dueDate = dueDate;
        this._completedAt = completedAt;
        this._tags = tags;
    }

    // Getters
    get title(): string { return this._title; }
    get description(): string { return this._description; }
    get priority(): TaskPriority { return this._priority; }
    get assignedTo(): string { return this._assignedTo; }
    get createdBy(): string { return this._createdBy; }
    get status(): TaskStatus { return this._status; }
    get dueDate(): Date | undefined { return this._dueDate; }
    get completedAt(): Date | undefined { return this._completedAt; }
    get tags(): string[] { return [...this._tags]; }

    // Setters with validation and business logic directly inside
    set title(newTitle: string) {
        if (!newTitle || newTitle.trim().length === 0) {
            throw new Error('Title cannot be empty');
        }
        this._title = newTitle.trim();
        this.updateVersion();
    }

    set description(newDescription: string) {
        this._description = newDescription || '';
        this.updateVersion();
    }

    set priority(newPriority: TaskPriority) {
        if (!Object.values(TaskPriority).includes(newPriority)) {
            throw new Error('Invalid priority value');
        }
        this._priority = newPriority;
        this.updateVersion();
    }

    set assignedTo(newAssignee: string) {
        if (!newAssignee || newAssignee.trim().length === 0) {
            throw new Error('Assignee cannot be empty');
        }
        this._assignedTo = newAssignee.trim();
        this.updateVersion();
    }

    set dueDate(newDueDate: Date | undefined) {
        if (newDueDate && newDueDate < new Date()) {
            throw new Error('Due date cannot be in the past');
        }
        this._dueDate = newDueDate;
        this.updateVersion();
    }

    set tags(newTags: string[]) {
        this._tags = newTags.filter(tag => tag && tag.trim().length > 0).map(tag => tag.trim());
        this.updateVersion();
    }

    // Special methods for complex operations that can't be done with simple setters
    addTag(tag: string): void {
        if (!tag || tag.trim().length === 0) {
            throw new Error('Tag cannot be empty');
        }
        const trimmedTag = tag.trim();
        if (!this._tags.includes(trimmedTag)) {
            this._tags.push(trimmedTag);
            this.updateVersion();
        }
    }

    removeTag(tag: string): void {
        const index = this._tags.indexOf(tag);
        if (index > -1) {
            this._tags.splice(index, 1);
            this.updateVersion();
        }
    }

    // Status management methods (these are business logic, not simple setters)
    start(): void {
        if (this.status !== TaskStatus.TODO) {
            throw new Error('Task must be in TODO status to be started');
        }
        this._status = TaskStatus.IN_PROGRESS;
        this.updateVersion();
    }

    complete(): void {
        if (this.status !== TaskStatus.IN_PROGRESS) {
            throw new Error('Task must be in progress to be completed');
        }
        this._status = TaskStatus.COMPLETED;
        this._completedAt = new Date();
        this.updateVersion();
    }

    cancel(): void {
        if (this.status === TaskStatus.COMPLETED) {
            throw new Error('Cannot cancel a completed task');
        }
        this._status = TaskStatus.CANCELLED;
        this.updateVersion();
    }

    reopen(): void {
        if (this.status === TaskStatus.CANCELLED) {
            this._status = TaskStatus.TODO;
            this._completedAt = undefined;
            this.updateVersion();
        }
    }

    // Business logic methods
    isOverdue(): boolean {
        if (!this._dueDate || this.status === TaskStatus.COMPLETED || this.status === TaskStatus.CANCELLED) {
            return false;
        }
        return new Date() > this._dueDate;
    }

    getDaysUntilDue(): number | null {
        if (!this._dueDate) return null;
        const now = new Date();
        const due = new Date(this._dueDate);
        const diffTime = due.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    canBeAssignedTo(userId: string): boolean {
        return this.status !== TaskStatus.COMPLETED && this.status !== TaskStatus.CANCELLED;
    }

    static create(
        title: string,
        description: string,
        priority: TaskPriority,
        assignedTo: string,
        createdBy: string,
        dueDate?: Date,
        tags: string[] = []
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
            undefined,
            tags
        );
    }

    private static generateId(): string {
        return `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }
}

