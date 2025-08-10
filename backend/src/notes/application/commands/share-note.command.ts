import { Command } from '@shared/application/commands/command';

export class ShareNoteCommand implements Command {
    readonly commandId: string;
    readonly occurredOn: Date;

    constructor(
        public readonly noteId: string,
        public readonly userId: string,
        public readonly sharedBy: string,
        public readonly action: 'ADD' | 'REMOVE'
    ) {
        this.commandId = `share_note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.occurredOn = new Date();
    }
}