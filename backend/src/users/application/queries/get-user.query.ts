import { Query } from '../../../shared/application/queries/query';
import { User } from '../../domain/entities/user.entity';

export class GetUserQuery implements Query<User | null> {
    constructor(public readonly userId: string) { }
}