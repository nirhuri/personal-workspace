import { BaseEntity } from '../../../shared/domain/entities/base.entity';

export class User extends BaseEntity {
    constructor(
        id: string,
        public readonly email: string,
        public readonly name: string,
        public readonly googleId: string,
        public readonly picture?: string
    ) {
        super(id);
    }

    static create(
        email: string,
        name: string,
        googleId: string,
        picture?: string
    ): User {
        return new User(
            this.generateId(),
            email,
            name,
            googleId,
            picture
        );
    }

    private static generateId(): string {
        return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}