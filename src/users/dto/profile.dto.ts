import { IsPhoneNumber } from 'class-validator';
import { Users } from '../entity/users.entity';

export class ProfileDto {
  id?: number;

  @IsPhoneNumber()
  mobileNumber: number;

  address: string;

  imageContent: string;

  users: Users;
}
