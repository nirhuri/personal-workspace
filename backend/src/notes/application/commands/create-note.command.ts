import { Command } from '@shared/application/commands/command';

export class CreateNoteCommand implements Command {
    readonly commandId: string;
    readonly occurredOn: Date;

    constructor(
        public readonly title: string,
        public readonly content: string,
        public readonly createdBy: string,
        public readonly type: string,
        public readonly sharedWith: string[] = [],
    ) {
        this.commandId = `create_note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.occurredOn = new Date();
    }
}