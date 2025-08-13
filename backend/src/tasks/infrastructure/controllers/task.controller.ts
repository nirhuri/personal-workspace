import { Controller, Post, Get, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { TaskService } from '../../application/services/task.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../../domain/entities/task.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'Task created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<{ message: string; taskId: string }> {
        return await this.taskService.createTask({
            ...createTaskDto,
            dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : undefined
        });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get task by ID' })
    @ApiParam({ name: 'id', description: 'Task ID' })
    @ApiResponse({ status: 200, description: 'Task found', type: Task })
    @ApiResponse({ status: 404, description: 'Task not found' })
    async getTask(@Param('id') id: string): Promise<Task | null> {
        return await this.taskService.getTask(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update task by ID' })
    @ApiParam({ name: 'id', description: 'Task ID' })
    @ApiBody({ type: UpdateTaskDto })
    @ApiResponse({ status: 200, description: 'Task updated successfully' })
    @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    async updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
        @Query('updatedBy') updatedBy: string
    ): Promise<{ message: string; taskId: string }> {
        return await this.taskService.updateTask({
            taskId: id,
            updatedBy,
            ...updateTaskDto,
            dueDate: updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : undefined
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete task by ID' })
    @ApiParam({ name: 'id', description: 'Task ID' })
    @ApiResponse({ status: 200, description: 'Task deleted successfully' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    async deleteTask(
        @Param('id') id: string,
        @Query('deletedBy') deletedBy: string
    ): Promise<{ message: string; taskId: string }> {
        return await this.taskService.deleteTask({
            taskId: id,
            deletedBy
        });
    }

    @Post(':id/complete')
    @ApiOperation({ summary: 'Mark task as completed' })
    @ApiParam({ name: 'id', description: 'Task ID' })
    @ApiResponse({ status: 200, description: 'Task completed successfully' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    async completeTask(
        @Param('id') id: string,
        @Query('completedBy') completedBy: string
    ): Promise<{ message: string; taskId: string }> {
        return await this.taskService.completeTask({
            taskId: id,
            completedBy
        });
    }

    @Get('assigned/:userId')
    @ApiOperation({ summary: 'Get tasks assigned to user' })
    @ApiParam({ name: 'userId', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'Tasks found', type: [Task] })
    async getTasksByAssignedTo(@Param('userId') userId: string): Promise<Task[]> {
        return await this.taskService.getTasksByAssignedTo(userId);
    }

    @Get('created/:userId')
    @ApiOperation({ summary: 'Get tasks created by user' })
    @ApiParam({ name: 'userId', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'Tasks found', type: [Task] })
    async getTasksByCreatedBy(@Param('userId') userId: string): Promise<Task[]> {
        return await this.taskService.getTasksByCreatedBy(userId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'Get tasks by status' })
    @ApiParam({ name: 'status', description: 'Task status' })
    @ApiResponse({ status: 200, description: 'Tasks found', type: [Task] })
    async getTasksByStatus(@Param('status') status: string): Promise<Task[]> {
        // Note: This method needs to be implemented in TaskService
        return [];
    }

    @Get('priority/:priority')
    @ApiOperation({ summary: 'Get tasks by priority' })
    @ApiParam({ name: 'priority', description: 'Task priority' })
    @ApiResponse({ status: 200, description: 'Tasks found', type: [Task] })
    async getTasksByPriority(@Param('priority') priority: string): Promise<Task[]> {
        // Note: This method needs to be implemented in TaskService
        return [];
    }
} 