import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { Author } from './author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../book/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Book])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
