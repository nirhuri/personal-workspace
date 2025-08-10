import { DomainEvent } from '../../../shared/domain/events/domain-event';

export class TaskCreatedEvent extends DomainEvent {
    constructor(
        public readonly taskId: string,
        public readonly title: string,
        public readonly description: string,
        public readonly assignedTo: string,
        public readonly createdBy: string,
        public readonly priority: string,
        public readonly dueDate?: Date
    ) {
        super(taskId, 1); // Pass version 1 for new events
    }

    getEventName(): string {
        return 'TaskCreated';
    }
}