import { Command } from '@shared/application/commands/command';

export class DeleteTaskCommand implements Command {
    readonly commandId: string;
    readonly occurredOn: Date;

    constructor(
        public readonly taskId: string,
        public readonly deletedBy: string
    ) {
        this.commandId = `delete_task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.occurredOn = new Date();
    }
} 