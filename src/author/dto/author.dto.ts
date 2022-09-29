import { IsNotEmpty } from 'class-validator';
import { Book } from '../../book/book.entity';

export class AuthorDTO {
  @IsNotEmpty({ message: 'First name can not empty' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name can not empty' })
  lastName: string;

  address: string;

  book: Book[];
}
