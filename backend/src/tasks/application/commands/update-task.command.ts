import { Command } from '@shared/application/commands/command';

export class UpdateTaskCommand implements Command {
    readonly commandId: string;
    readonly occurredOn: Date;

    constructor(
        public readonly taskId: string,
        public readonly updatedBy: string,
        public readonly title?: string,
        public readonly description?: string,
        public readonly priority?: string,
        public readonly assignedTo?: string,
        public readonly dueDate?: Date,
        public readonly tags?: string[]
    ) {
        this.commandId = `update_task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.occurredOn = new Date();
    }
} 