import { IsNotEmpty, IsNumber } from 'class-validator';
import { Status } from '../../common/enum/status.enum';
import { Author } from '../../author/author.entity';

export class BookDTO {
  id?: number;

  @IsNotEmpty({ message: 'Book name can not empty' })
  bookName: string;

  @IsNotEmpty({ message: 'Book price can not empty' })
  bookPrice: number;

  @IsNotEmpty({ message: 'Book title can not empty' })
  title: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Book page can not empty' })
  pages: number;

  details: string;

  status: Status;

  author: Author;
}
