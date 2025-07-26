import { Command } from '../../../shared/application/commands/command';

export class CreateUserCommand implements Command {
    readonly commandId: string;
    readonly occurredOn: Date;

    constructor(
        public readonly email: string,
        public readonly name: string,
        public readonly googleId: string,
        public readonly picture?: string
    ) {
        this.commandId = `create_user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.occurredOn = new Date();
    }
}