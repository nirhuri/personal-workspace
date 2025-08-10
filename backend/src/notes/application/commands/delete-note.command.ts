import { Command } from '@shared/application/commands/command';

export class DeleteNoteCommand implements Command {
    readonly commandId: string;
    readonly occurredOn: Date;

    constructor(
        public readonly noteId: string,
        public readonly deletedBy: string,
    ) {
        this.commandId = `delete_note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.occurredOn = new Date();
    }
}