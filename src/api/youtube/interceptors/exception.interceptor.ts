import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/api/auth/auth.service';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.response && error.response.status === 401) {
          return throwError(
            () => new UnauthorizedException('google AccessToken 만료'),
          );
        }
        return throwError(() => error);
      }),
    );
  }
}
