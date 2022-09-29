import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MESSAGES } from '../common/constans/constans';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { BookDTO } from './dto/book.dto';

@Injectable()
export class BookService {
  logger = new Logger(BookService.name);
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getAllBook(): Promise<BookDTO[]> {
    const book = await this.bookRepository.find();
    if (book?.length) {
      return book;
    } else {
      this.logger.warn(MESSAGES.BOOK_NOT_FOUND);
      throw new NotFoundException(MESSAGES.BOOK_NOT_FOUND);
    }
  }

  async addBook(bookDTO: BookDTO): Promise<BookDTO | object> {
    try {
      const book = await this.bookRepository.save(bookDTO);
      if (book) {
        return { message: MESSAGES.BOOK_ADDED_SUCCESS };
      } else {
        throw new NotFoundException(MESSAGES.BOOK_NOT_FOUND);
      }
    } catch (error) {
      this.logger.error(error.message);
      if (error?.code === MESSAGES.CODE_ALREADY_EXIST) {
        throw new ConflictException(MESSAGES.BOOK_NAME_EXIST);
      } else if (error?.code === MESSAGES.CODE_NOT_NULL) {
        throw new NotAcceptableException(MESSAGES.BOOK_NOT_NULL);
      } else {
        throw new BadRequestException();
      }
    }
  }

  async updateBook(id: number, bookDTO: BookDTO): Promise<BookDTO | object> {
    const bookInfo = await this.bookRepository.findOneBy({ id });
    if (bookInfo) {
      const updateBook = await this.bookRepository.update(id, bookDTO);
      if (updateBook.affected) {
        return { message: MESSAGES.UPDATE_SUCCESS };
      } else {
        this.logger.warn(MESSAGES.BOOK_NOT_AVAILABLE);
        return { message: MESSAGES.BOOK_NOT_AVAILABLE };
      }
    } else {
      this.logger.warn(MESSAGES.BOOK_NOT_FOUND);
      throw new NotFoundException(MESSAGES.BOOK_NOT_FOUND);
    }
  }

  async deleteBook(id: number): Promise<BookDTO | object> {
    const bookInfo = await this.bookRepository.findOneBy({ id });
    if (bookInfo) {
      const deleteBook = await this.bookRepository.delete(id);
      if (deleteBook?.affected) {
        return { message: MESSAGES.DELETE_SUCCESS };
      } else {
        this.logger.warn(MESSAGES.BOOK_NOT_FOUND);
        throw new NotFoundException(MESSAGES.BOOK_NOT_FOUND);
      }
    } else {
      this.logger.warn(MESSAGES.BOOK_NOT_FOUND);
      throw new NotFoundException(MESSAGES.BOOK_NOT_FOUND);
    }
  }
}
