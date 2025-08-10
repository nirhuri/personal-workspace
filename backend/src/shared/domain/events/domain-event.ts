export abstract class DomainEvent {
    public readonly occurredOn: Date;
    public readonly eventId: string;
    public readonly aggregateId: string;
    public readonly version: number;

    constructor(aggregateId: string, version: number = 1) {
        this.aggregateId = aggregateId;
        this.occurredOn = new Date();
        this.eventId = this.generateEventId();
        this.version = version;
    }

    private generateEventId(): string {
        return `${this.constructor.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    abstract getEventName(): string;
}