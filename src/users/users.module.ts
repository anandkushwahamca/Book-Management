import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt-strategy';
import { MESSAGES } from '../common/constans/constans';
import { UserRepository } from './repository/users.repository';
import { Profile } from './entity/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Profile]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: MESSAGES.EXPIRES_IN },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
