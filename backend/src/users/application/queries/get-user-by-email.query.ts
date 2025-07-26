import { Query } from '../../../shared/application/queries/query';

export class GetUserByEmailQuery implements Query<any> {
    readonly queryId: string;
    readonly occurredOn: Date;

    constructor(public readonly email: string) {
        this.queryId = `get_user_by_email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.occurredOn = new Date();
    }
} 