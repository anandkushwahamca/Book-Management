import { IsString, MaxLength, MinLength } from 'class-validator';
import { Profile } from '../entity/profile.entity';

export class UpdateUserDto {
  id?: number;

  @IsString()
  @MinLength(3)
  @MaxLength(40)
  name: string;

  profile: Profile;
}
