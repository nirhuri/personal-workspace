import { Query } from '../../../shared/application/queries/query';

export class GetUserQuery implements Query<any> {
    readonly queryId: string;
    readonly occurredOn: Date;

    constructor(public readonly userId: string) {
        this.queryId = `get_user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.occurredOn = new Date();
    }
}