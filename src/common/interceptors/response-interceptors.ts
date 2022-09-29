import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    const response = next.handle().pipe(
      map((data) => {
        return {
          statusCode,
          data,
          errorMessage: null,
        };
      }),
    );
    return response;
  }
}
