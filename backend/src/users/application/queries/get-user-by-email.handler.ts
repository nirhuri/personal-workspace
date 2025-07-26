import { Injectable, Inject } from '@nestjs/common';
import { QueryHandler } from '../../../shared/application/queries/query';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class GetUserByEmailHandler implements QueryHandler<GetUserByEmailQuery, any> {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ) { }

    async execute(query: GetUserByEmailQuery): Promise<any> {
        const user = await this.userRepository.findByEmail(query.email);
        return user;
    }
} 