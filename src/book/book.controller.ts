import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../auth/role-guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookService } from './book.service';
import { BookDTO } from './dto/book.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enum/role.enum';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBook(): Promise<BookDTO[]> {
    return await this.bookService.getAllBook();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async addBook(@Body() bookDTO: BookDTO): Promise<BookDTO | object> {
    return await this.bookService.addBook(bookDTO);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() book: BookDTO,
  ): Promise<BookDTO | object> {
    return await this.bookService.updateBook(id, book);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteBook(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BookDTO | object> {
    return await this.bookService.deleteBook(id);
  }

  @Get('bookTitle/:title')
  async searchBooksByTitle(@Param('title') title: string): Promise<BookDTO[]> {
    return await this.bookService.searchBooksByTitle(title);
  }
}
