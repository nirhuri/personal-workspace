import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskRepository } from '@/tasks/domain/repositories/tasks.repository';
import { Task } from '@/tasks/domain/entities/task.entity';
import { TaskDocument } from '@/tasks/infrastructure/schemas/task.schema';
import { BaseMongoRepository } from '../../../shared/infrastructure/database/base-mongo.repository';

@Injectable()
export class TaskMongoRepository extends BaseMongoRepository<Task> implements TaskRepository {
    constructor(
        @InjectModel(TaskDocument.name)
        private readonly taskModel: Model<TaskDocument>
    ) {
        super(
            taskModel,
            TaskMongoRepository.toEntity,
            TaskMongoRepository.toDocument
        );
    }

    // רק המתודות המיוחדות ל-Task
    async findByAssignedTo(userId: string): Promise<Task[]> {
        const documents = await this.taskModel.find({ assignedTo: userId }).exec();
        return documents.map(doc => TaskMongoRepository.toEntity(doc));
    }

    async findByCreatedBy(userId: string): Promise<Task[]> {
        const documents = await this.taskModel.find({ createdBy: userId }).exec();
        return documents.map(doc => TaskMongoRepository.toEntity(doc));
    }

    async findByStatus(status: string): Promise<Task[]> {
        const documents = await this.taskModel.find({ status }).exec();
        return documents.map(doc => TaskMongoRepository.toEntity(doc));
    }

    private static toEntity(document: TaskDocument): Task {
        return new Task(
            document.id,
            document.title,
            document.description,
            document.priority as any,
            document.assignedTo,
            document.createdBy,
            document.status as any,
            document.dueDate,
            document.completedAt
        );
    }

    private static toDocument(task: Task): any {
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            assignedTo: task.assignedTo,
            createdBy: task.createdBy,
            dueDate: task.dueDate,
            completedAt: task.completedAt,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
            version: task.version,
        };
    }
}