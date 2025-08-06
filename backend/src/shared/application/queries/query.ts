// Base query interface
export interface Query<TResult> {
    // Removed queryId and occurredOn since queries are read-only
    // and don't need audit trail
}

// Base query handler interface
export interface QueryHandler<TQuery extends Query<TResult>, TResult> {
    execute(query: TQuery): Promise<TResult>;
}