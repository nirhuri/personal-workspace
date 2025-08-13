import { IsString, IsOptional, IsEnum, IsDateString, IsArray, ArrayMaxSize, MaxLength, MinLength } from 'class-validator';
import { TaskPriority } from '../../domain/entities/task.entity';

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(200)
    title?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(1000)
    description?: string;

    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;

    @IsOptional()
    @IsString()
    @MinLength(1)
    assignedTo?: string;

    @IsOptional()
    @IsDateString()
    dueDate?: string;

    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @IsString({ each: true })
    tags?: string[];
} 