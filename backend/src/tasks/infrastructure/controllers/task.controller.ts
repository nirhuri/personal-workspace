import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { TaskService } from '../../application/services/task.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { Task } from '../../domain/entities/task.entity';

@Controller('tasks')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<{ message: string; taskId: string }> {
        return await this.taskService.createTask(createTaskDto);
    }

    @Get(':id')
    async getTask(@Param('id') id: string): Promise<Task | null> {
        return await this.taskService.getTask(id);
    }

    @Get('assigned/:userId')
    async getTasksByAssignedTo(@Param('userId') userId: string): Promise<Task[]> {
        return await this.taskService.getTasksByAssignedTo(userId);
    }

    @Get('created/:userId')
    async getTasksByCreatedBy(@Param('userId') userId: string): Promise<Task[]> {
        return await this.taskService.getTasksByCreatedBy(userId);
    }
} 