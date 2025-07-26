export abstract class DomainEvent {
    public readonly occurredOn: Date;
    public readonly eventId: string;
    public readonly aggregateId: string;

    constructor(aggregateId: string) {
        this.aggregateId = aggregateId;
        this.occurredOn = new Date();
        this.eventId = this.generateEventId();
    }

    private generateEventId(): string {
        return `${this.constructor.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    abstract getEventName(): string;
}