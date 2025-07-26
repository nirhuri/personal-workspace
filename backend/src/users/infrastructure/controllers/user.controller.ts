import { Controller, Post, Get, Param, Body, Inject } from '@nestjs/common';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { CreateUserHandler } from '../../application/commands/create-user.handler';
import { GetUserQuery } from '../../application/queries/get-user.query';
import { GetUserHandler } from '../../application/queries/get-user.handler';
import { GetUserByEmailQuery } from '../../application/queries/get-user-by-email.query';
import { GetUserByEmailHandler } from '../../application/queries/get-user-by-email.handler';

@Controller('users')
export class UserController {
    constructor(
        @Inject(CreateUserHandler) private readonly createUserHandler: CreateUserHandler,
        @Inject(GetUserHandler) private readonly getUserHandler: GetUserHandler,
        @Inject(GetUserByEmailHandler) private readonly getUserByEmailHandler: GetUserByEmailHandler
    ) { }

    @Post()
    async createUser(@Body() body: { email: string; name: string; googleId: string; picture?: string }) {
        const command = new CreateUserCommand(body.email, body.name, body.googleId, body.picture);
        await this.createUserHandler.execute(command);
        return { message: 'User created successfully' };
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        const query = new GetUserQuery(id);
        const user = await this.getUserHandler.execute(query);
        return user;
    }

    @Get('email/:email')
    async getUserByEmail(@Param('email') email: string) {
        const query = new GetUserByEmailQuery(email);
        const user = await this.getUserByEmailHandler.execute(query);
        return user;
    }
}