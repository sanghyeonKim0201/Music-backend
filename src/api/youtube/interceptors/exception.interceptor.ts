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
          // const { id } = request.user;
          // return from(this.authService.refreshGoogleAccessToken(id)).pipe(
          // switchMap(() => {
          // 새로운 요청 컨텍스트 생성
          // Logger.debug('재요청');
          // 원래 요청 다시 시도
          // return next.handle();
          // }),
          // catchError((refreshError) => {
          //   // 토큰 갱신 중 에러 처리
          //   Logger.error('에러');
          //   return throwError(
          //     () =>
          //       new HttpException(
          //         refreshError.message,
          //         HttpStatus.UNAUTHORIZED,
          //       ),
          //   );
          // }),
          // );
        }
        return throwError(() => error);
      }),
    );
  }
}
