import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/api/auth/auth.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private authService: AuthService) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : (exception as any).message || 'Internal server error';

    if (request.url.startsWith('/api/youtube') && status === 401) {
      //@ts-expect-error type
      const { id } = request.user;
      this.authService.refreshGoogleAccessToken(id);
      response.redirect(request.url);
    } else {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message.message ?? message,
      });
    }
  }
}
