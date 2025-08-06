import { BaseRepository } from '../../../shared/domain/repositories/base.repository';
import { User } from '../entities/user.entity';

export interface UserRepository extends BaseRepository<User> {
    findByEmail(email: string): Promise<User | null>;
    findByGoogleId(googleId: string): Promise<User | null>;
}