// backend/src/common/interceptors/response.interceptor.ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, { data: T }> {
    intercept(_ctx: ExecutionContext, next: CallHandler<T>) {
        return next.handle().pipe(
            map((data) => ({ data }))
        );
    }
}