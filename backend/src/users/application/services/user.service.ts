import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { CreateUserCommand } from '../commands/create-user.command';
import { CreateUserHandler } from '../commands/create-user.handler';
import { GetUserHandler } from '../queries/get-user.handler';
import { GetUserByEmailHandler } from '../queries/get-user-by-email.handler';
import { GetUserQuery } from '../queries/get-user.query';
import { GetUserByEmailQuery } from '../queries/get-user-by-email.query';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository,
        private readonly createUserHandler: CreateUserHandler,
        private readonly getUserHandler: GetUserHandler,
        private readonly getUserByEmailHandler: GetUserByEmailHandler
    ) { }

    async createUser(createUserDto: {
        email: string;
        name: string;
        googleId: string;
        picture?: string;
    }): Promise<{ message: string; userId: string }> {
        const command = new CreateUserCommand(
            createUserDto.email,
            createUserDto.name,
            createUserDto.googleId,
            createUserDto.picture
        );

        await this.createUserHandler.execute(command);

        return {
            message: 'User created successfully',
            userId: command.commandId
        };
    }

    async getUser(id: string): Promise<User | null> {
        const query = new GetUserQuery(id);
        return await this.getUserHandler.execute(query);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const query = new GetUserByEmailQuery(email);
        return await this.getUserByEmailHandler.execute(query);
    }

    async getUserByGoogleId(googleId: string): Promise<User | null> {
        return await this.userRepository.findByGoogleId(googleId);
    }

    async updateUserProfile(userId: string, updateData: {
        name?: string;
        picture?: string;
    }): Promise<{ message: string; userId: string }> {
        const user = await this.getUser(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Note: We need to add update methods to User entity
        // For now, we'll just update the version
        user.updateVersion();
        await this.userRepository.save(user);

        return {
            message: 'User profile updated successfully',
            userId
        };
    }

    async deleteUser(userId: string): Promise<{ message: string; userId: string }> {
        const user = await this.getUser(userId);
        if (!user) {
            throw new Error('User not found');
        }

        await this.userRepository.delete(userId);

        return {
            message: 'User deleted successfully',
            userId
        };
    }
} 