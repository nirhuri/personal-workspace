import { Command } from '@shared/application/commands/command';

export class UpdateNoteCommand implements Command {
    readonly commandId: string;
    readonly occurredOn: Date;

    constructor(
        public readonly noteId: string,
        public readonly updatedBy: string,
        public readonly title?: string,
        public readonly content?: string,
    ) {
        {
            this.commandId = `update_note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            this.occurredOn = new Date();
        }
    }
}