import { Injectable } from '@nestjs/common';
import { EventHandler } from '../../../shared/application/events/event-bus';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { EventHandler as EventHandlerDec } from '@/shared/application/events/event-handler.decorator';

@Injectable()
@EventHandlerDec('UserCreated')
export class UserCreatedHandler implements EventHandler<UserCreatedEvent> {
    async handle(event: UserCreatedEvent): Promise<void> {
        console.log(`User created: ${event.userId} with email: ${event.email}`);
    }
}