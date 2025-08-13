import { Command } from '@shared/application/commands/command';

export class CompleteTaskCommand implements Command {
    readonly commandId: string;
    readonly occurredOn: Date;

    constructor(
        public readonly taskId: string,
        public readonly completedBy: string
    ) {
        this.commandId = `complete_task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.occurredOn = new Date();
    }
} 