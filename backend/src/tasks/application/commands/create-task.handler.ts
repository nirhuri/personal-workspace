import { CommandHandler } from "@/shared/application/commands/command";
import { CreateTaskCommand } from "./create-task.command";
import { Inject, Injectable } from "@nestjs/common";
import { Task, TaskPriority } from "@/tasks/domain/entities/task.entity";
import { TaskCreatedEvent } from "@/tasks/domain/events/task-created.event";
import { EventBus } from "@/shared/application/events/event-bus";
import { TaskRepository } from "@/tasks/domain/repositories/tasks.repository";


@Injectable()
export class CreateTaskHandler implements CommandHandler<CreateTaskCommand> {
    constructor(
        @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
        @Inject('EventBus') private readonly eventBus: EventBus
    ) { }

    async execute(command: CreateTaskCommand): Promise<void> {
        const task = Task.create(
            command.title,
            command.description,
            command.priority as TaskPriority,
            command.assignedTo,
            command.createdBy,
            command.dueDate
        );

        await this.taskRepository.save(task);
        await this.eventBus.publish(
            new TaskCreatedEvent(
                task.id,
                task.title,
                task.description,
                task.assignedTo,
                task.createdBy,
                task.priority,
                task.dueDate
            )
        );
    }
}