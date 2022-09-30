import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    const protocal = req?.protocol;
    const host = req?.get('host');
    const url = req?.originalUrl;
    const method = req?.method;
    const date = new Date().toDateString();
    this.logger.log(protocal + '://' + host + url + ' ' + method + ' ' + date);
    next();
  }
}
