// Base command interface
export interface Command {
    readonly commandId: string;
    readonly occurredOn: Date;
}

// Base command handler interface
export interface CommandHandler<T extends Command> {
    execute(command: T): Promise<void>;
}