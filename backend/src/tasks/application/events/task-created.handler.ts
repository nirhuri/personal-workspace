import { Injectable } from '@nestjs/common';
import { TaskCreatedEvent } from '../../domain/events/task-created.event';
import { EventHandler } from '../../../shared/application/events/event-handler.decorator';

@Injectable()
@EventHandler('TaskCreated')
export class TaskCreatedEventHandler {
    async handle(event: TaskCreatedEvent): Promise<void> {
        console.log(`Task created: ${event.taskId} - ${event.title}`);
    }
} 