import { Injectable, Inject } from '@nestjs/common';
import { QueryHandler } from '../../../shared/application/queries/query';
import { GetUserQuery } from './get-user.query';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class GetUserHandler implements QueryHandler<GetUserQuery, any> {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ) { }

    async execute(query: GetUserQuery): Promise<any> {
        const user = await this.userRepository.findById(query.userId);
        return user;
    }
}