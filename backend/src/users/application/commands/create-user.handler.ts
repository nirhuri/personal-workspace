import { Injectable, Inject } from '@nestjs/common';
import { CommandHandler } from '../../../shared/application/commands/command';
import { CreateUserCommand } from './create-user.command';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { EventBus } from '../../../shared/application/events/event-bus';
import { UserCreatedEvent } from '../../domain/events/user-created.event';

@Injectable()
export class CreateUserHandler implements CommandHandler<CreateUserCommand> {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository,
        @Inject('EventBus') private readonly eventBus: EventBus
    ) { }

    async execute(command: CreateUserCommand): Promise<void> {
        const user = User.create(
            command.email,
            command.name,
            command.googleId,
            command.picture
        );

        await this.userRepository.save(user);

        await this.eventBus.publish(
            new UserCreatedEvent(user.id, user.email, user.name)
        );
    }
}