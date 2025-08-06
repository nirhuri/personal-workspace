import { BaseEntity } from '../entities/base.entity';

export interface BaseRepository<T extends BaseEntity> {
    findById(id: string): Promise<T | null>;
    save(entity: T): Promise<T>;
    delete(id: string): Promise<void>;
} 