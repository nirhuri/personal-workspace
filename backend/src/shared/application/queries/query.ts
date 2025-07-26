// Base query interface
export interface Query<TResult> {
    readonly queryId: string;
    readonly occurredOn: Date;
}

// Base query handler interface
export interface QueryHandler<TQuery extends Query<TResult>, TResult> {
    execute(query: TQuery): Promise<TResult>;
}