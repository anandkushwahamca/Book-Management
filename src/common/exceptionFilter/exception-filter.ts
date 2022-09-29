import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { MESSAGES } from '../constans/constans';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const validationError: any = exception.getResponse();
    const MSG = MESSAGES.VALIDATE_MESSAGE;
    const { [MSG]: validateMessage } = validationError;

    switch (exception.constructor) {
      case BadRequestException:
        response.status(status).json({
          statusCode: status,
          data: null,
          errorMessage: validateMessage,
        });
        break;
      default:
        response.status(status).json({
          statusCode: status,
          data: null,
          errorMessage: exception.message,
        });
    }
  }
}
