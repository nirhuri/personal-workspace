import { IsString, IsNotEmpty, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { TaskPriority } from '../../domain/entities/task.entity';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsEnum(TaskPriority)
    readonly priority: TaskPriority;

    @IsString()
    @IsNotEmpty()
    readonly assignedTo: string;

    @IsString()
    @IsNotEmpty()
    readonly createdBy: string;

    @IsOptional()
    @IsDateString()
    readonly dueDate?: Date;
} 