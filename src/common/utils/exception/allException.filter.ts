import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
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
      response.cookie('originUrl', request.url, { httpOnly: true });
      response.redirect('/api/auth/google/refresh');
    } else {
      Logger.error(`status : ${status}`);
      Logger.error(`path : ${request.url}`);
      Logger.error(`message : ${message.message ?? message}`);
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message.message ?? message,
      });
    }
  }
}
