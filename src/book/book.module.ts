import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../author/author.entity';
import { LoggerMiddleware } from '../common/middleware/logger.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: 'book', method: RequestMethod.GET },
        { path: 'book', method: RequestMethod.POST },
        { path: 'book/:id', method: RequestMethod.PUT },
        { path: 'book/:id', method: RequestMethod.DELETE },
        { path: 'book/bookTitle/:title', method: RequestMethod.GET },
      );
  }
}
