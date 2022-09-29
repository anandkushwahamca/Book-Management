import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../author/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
