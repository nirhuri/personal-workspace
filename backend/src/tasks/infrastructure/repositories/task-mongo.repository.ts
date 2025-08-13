import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskRepository } from '@/tasks/domain/repositories/tasks.repository';
import { Task, TaskStatus, TaskPriority } from '@/tasks/domain/entities/task.entity';
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

    // Custom query methods for Task
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

    async findByPriority(priority: string): Promise<Task[]> {
        const documents = await this.taskModel.find({ priority }).exec();
        return documents.map(doc => TaskMongoRepository.toEntity(doc));
    }

    async findByDueDateRange(startDate: Date, endDate: Date): Promise<Task[]> {
        const documents = await this.taskModel.find({
            dueDate: { $gte: startDate, $lte: endDate }
        }).exec();
        return documents.map(doc => TaskMongoRepository.toEntity(doc));
    }

    async findByTags(tags: string[]): Promise<Task[]> {
        const documents = await this.taskModel.find({
            tags: { $in: tags }
        }).exec();
        return documents.map(doc => TaskMongoRepository.toEntity(doc));
    }

    async findOverdueTasks(): Promise<Task[]> {
        const now = new Date();
        const documents = await this.taskModel.find({
            dueDate: { $lt: now },
            status: { $nin: ['COMPLETED', 'CANCELLED'] }
        }).exec();
        return documents.map(doc => TaskMongoRepository.toEntity(doc));
    }

    async findTasksDueToday(): Promise<Task[]> {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

        const documents = await this.taskModel.find({
            dueDate: { $gte: startOfDay, $lte: endOfDay },
            status: { $nin: ['COMPLETED', 'CANCELLED'] }
        }).exec();
        return documents.map(doc => TaskMongoRepository.toEntity(doc));
    }

    private static toEntity(document: TaskDocument): Task {
        return new Task(
            document.id,
            document.title,
            document.description,
            document.priority as TaskPriority,
            document.assignedTo,
            document.createdBy,
            document.status as TaskStatus,
            document.dueDate,
            document.completedAt,
            document.tags || []
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
            tags: task.tags,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
            version: task.version,
        };
    }
}