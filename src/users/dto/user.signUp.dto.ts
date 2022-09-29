import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Profile } from '../entity/profile.entity';
import { IsPasswordValid } from '../validators/password.validator';

export class SignUpDto {
  id?: number;

  @IsString()
  @MinLength(3)
  @MaxLength(40)
  name: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsPasswordValid()
  password: string;

  @MaxLength(250)
  @IsEmail()
  @IsNotEmpty({ message: 'Email can not empty' })
  email: string;

  profile: Profile;
}
