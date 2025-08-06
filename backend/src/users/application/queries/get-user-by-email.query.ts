import { Query } from '../../../shared/application/queries/query';
import { User } from '../../domain/entities/user.entity';

export class GetUserByEmailQuery implements Query<User | null> {
    constructor(public readonly email: string) { }
} 