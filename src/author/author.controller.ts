import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorDTO } from './dto/author.dto';

@Controller('author')
export class AuthorController {
  logger = new Logger(AuthorController.name);
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async getAllAuthor(): Promise<AuthorDTO[]> {
    return await this.authorService.getAllAuthor();
  }

  @Post()
  async createAuthor(
    @Body() authorDTO: AuthorDTO,
  ): Promise<AuthorDTO | object> {
    return await this.authorService.saveAuthor(authorDTO);
  }

  @Put(':id')
  async updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body() authorDTO: AuthorDTO,
  ): Promise<AuthorDTO | object> {
    return await this.authorService.updateAuthor(id, authorDTO);
  }

  @Delete(':id')
  async deleteAuthor(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AuthorDTO | object> {
    return await this.authorService.deleteAuthor(id);
  }

  @Get('sorting')
  async sortingAuthor(): Promise<AuthorDTO[]> {
    return await this.authorService.sortingAuthor();
  }
}
