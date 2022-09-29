import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from '../../users/entity/users.entity';

@Injectable()
export class UserRepository extends Repository<Users> {
  constructor(private readonly dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }
}
