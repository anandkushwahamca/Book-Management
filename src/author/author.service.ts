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
import { Author } from './author.entity';
import { AuthorDTO } from './dto/author.dto';
import { Book } from '../book/book.entity';

@Injectable()
export class AuthorService {
  logger = new Logger(AuthorService.name);
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getAllAuthor(): Promise<AuthorDTO[]> {
    const author = await this.authorRepository.find();
    if (author?.length) {
      return author;
    } else {
      this.logger.warn(MESSAGES.AUTHOR_NOT_FOUND);
      throw new NotFoundException(MESSAGES.AUTHOR_NOT_FOUND);
    }
  }

  async saveAuthor(authorDTO: AuthorDTO): Promise<AuthorDTO | object> {
    try {
      const authorRes = await this.authorRepository.save(authorDTO);
      if (authorRes) {
        return { message: MESSAGES.AUTHOR_ADDED_SUCCESS };
      } else {
        this.logger.warn(MESSAGES.AUTHOR_NOT_FOUND);
        throw new NotFoundException(MESSAGES.AUTHOR_NOT_FOUND);
      }
    } catch (error) {
      this.logger.error(error.message);
      if (error?.code === MESSAGES.CODE_ALREADY_EXIST) {
        throw new ConflictException(MESSAGES.AUTHOR_NAME_EXIST);
      } else if (error?.code === MESSAGES.CODE_NOT_NULL) {
        throw new NotAcceptableException(MESSAGES.AUTHOR_NOT_NULL);
      } else {
        throw new BadRequestException();
      }
    }
  }

  async updateAuthor(
    id: number,
    authorDTO: AuthorDTO,
  ): Promise<AuthorDTO | object> {
    const authorInfo = await this.authorRepository.findOneBy({ id });
    if (authorInfo) {
      const updateAuthor = await this.authorRepository.update(id, authorDTO);
      if (updateAuthor.affected) {
        return { message: MESSAGES.UPDATE_SUCCESS };
      } else {
        this.logger.warn(MESSAGES.AUTHOR_NOT_FOUND);
        throw new NotFoundException(MESSAGES.AUTHOR_NOT_FOUND);
      }
    } else {
      this.logger.warn(MESSAGES.AUTHOR_NOT_FOUND);
      throw new NotFoundException(MESSAGES.AUTHOR_NOT_FOUND);
    }
  }

  async deleteAuthor(id: number): Promise<AuthorDTO | any> {
    try {
      const authorInfo = await this.authorRepository.findOneBy({ id });
      if (authorInfo) {
        const deleteAuthor = await this.authorRepository.delete(id);
        if (deleteAuthor.affected) {
          return { message: MESSAGES.DELETE_SUCCESS };
        } else {
          this.logger.warn(MESSAGES.AUTHOR_NOT_FOUND);
          throw new NotFoundException(MESSAGES.AUTHOR_NOT_FOUND);
        }
      } else {
        this.logger.warn(MESSAGES.AUTHOR_NOT_FOUND);
        throw new NotFoundException(MESSAGES.AUTHOR_NOT_FOUND);
      }
    } catch (error) {
      this.logger.error(error.message);
      if (error?.code === MESSAGES.CODE_NOT_DELETE) {
        throw new NotAcceptableException(MESSAGES.AUTHOR_NOT_DELETE);
      }
    }
  }

  async sortingAuthor(): Promise<AuthorDTO[]> {
    const authorInfo = this.authorRepository.find({
      // where: { id, createdOn },
      order: {
        createdOn: 'DESC',
        id: 'DESC',
      },
    });
    if (authorInfo) {
      return authorInfo;
    } else {
      this.logger.warn(MESSAGES.AUTHOR_NOT_FOUND);
      throw new NotFoundException(MESSAGES.AUTHOR_NOT_FOUND);
    }
  }
}
