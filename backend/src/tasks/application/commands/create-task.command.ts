import { Command } from '@shared/application/commands/command';

export class CreateTaskCommand implements Command {
    readonly commandId: string;
    readonly occurredOn: Date;

    constructor(
        public readonly title: string,
        public readonly description: string,
        public readonly priority: string,
        public readonly assignedTo: string,
        public readonly createdBy: string,
        public readonly dueDate?: Date,
    ) {
        this.commandId = `create_task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.occurredOn = new Date();
    }
}