import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { MESSAGES } from '../common/constans/constans';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/user-login.dto';
import { SignUpDto } from './dto/user.signUp.dto';
import { UsersDTO } from './dto/users.dto';
import { JwtService } from '@nestjs/jwt';
import { Profile } from './entity/profile.entity';
import { UserRepository } from './repository/users.repository';
import { UpdateUserDto } from './dto/user.update.dto';

/**
 * Fetch the details of database from the user table
 */
@Injectable()
export class UsersService {
  logger = new Logger(UsersService.name);

  constructor(
    private readonly usersRepository: UserRepository,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Fetch users from database
   * @returns List of users
   */
  async getAllUsers(): Promise<UsersDTO[] | object> {
    const users = await this.usersRepository.find({
      relations: ['profile'],
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        profile: {
          id: true,
          mobileNumber: true,
          address: true,
        },
      },
    });
    if (users.length) {
      return users;
    } else {
      this.logger.warn(MESSAGES.USER_NOT_FOUND);
      throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
    }
  }

  /**
   * Fetch user details by id from database
   * @param userId user id
   * @returns List of user
   */
  async getUserById(userId: number): Promise<UsersDTO | object> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (user) {
      delete user.password;
      return user;
    } else {
      this.logger.warn(MESSAGES.USER_NOT_FOUND);
      throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
    }
  }

  /**
   * User register
   * @param signUpDto name, username, email, password, role and profile details
   * @returns User details
   */
  async register(signUpDto: SignUpDto): Promise<SignUpDto | object> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(signUpDto.password, salt);
      const users = await this.usersRepository.save({
        ...signUpDto,
        password: hashedPassword,
      });
      if (users) {
        this.logger.log(MESSAGES.USER_CREATE);
        return { message: MESSAGES.USER_CREATE };
      } else {
        throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
      }
    } catch (error) {
      this.logger.error(error.message);
      if (error && error.code === MESSAGES.CODE_ALREADY_EXIST) {
        throw new ConflictException(MESSAGES.EMAIL_EXIST);
      } else if (error && error.code === MESSAGES.CODE_NOT_NULL) {
        throw new NotAcceptableException(MESSAGES.EMAIL_NOT_NULL);
      } else if (error && error.code === MESSAGES.CODE_ROLE) {
        throw new NotAcceptableException(MESSAGES.USER_INVALID_ROLE);
      } else {
        throw new BadRequestException();
      }
    }
  }

  /**
   * User login
   * @param loginUserDto email and password
   * @returns Token
   */
  async login(loginUserDto: LoginUserDto): Promise<LoginUserDto | object> {
    try {
      const user = await this.usersRepository.findOne({
        where: { email: loginUserDto?.email },
      });
      if (!user) {
        this.logger.warn(MESSAGES.AUTH_FAILED);
        throw new UnauthorizedException(MESSAGES.AUTH_FAILED);
      } else if (
        !(await bcrypt.compare(loginUserDto.password, user.password))
      ) {
        this.logger.warn(MESSAGES.AUTH_FAILED);
        throw new UnauthorizedException(MESSAGES.AUTH_FAILED);
      } else if (loginUserDto.email && loginUserDto.password) {
        const payload = { email: user.email, id: user.id };
        const token = await this.jwtService.signAsync(payload);
        return {
          accessToken: token,
        };
      } else {
        this.logger.warn(MESSAGES.AUTH_FAILED);
        throw new UnauthorizedException(MESSAGES.AUTH_FAILED);
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new UnauthorizedException(MESSAGES.AUTH_FAILED);
    }
  }

  /**
   * Update user details in database
   * @param id user id
   * @param updateUserDto name, address, mobile number and image content
   * @returns number of effected row
   */
  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto | object> {
    const userInfo = await this.usersRepository.findOneBy({ id });
    if (userInfo) {
      const updateUser = await this.usersRepository.save({
        ...userInfo,
        ...updateUserDto,
      });
      if (updateUser) {
        return { message: MESSAGES.UPDATE_SUCCESS };
      } else {
        this.logger.warn(MESSAGES.USER_NOT_FOUND);
        throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
      }
    } else {
      this.logger.warn(MESSAGES.USER_NOT_FOUND);
      throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
    }
  }

  /**
   * Delete user form database from user id
   * @param id user id
   * @returns number of effected row
   */
  async deleteUser(id: number): Promise<UsersDTO | object> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user?.profile?.id) {
      const profileRes = await this.profileRepository.findOne({
        where: { id: user?.profile?.id },
      });
      if (profileRes?.id) {
        const deleteRes = await this.profileRepository.delete(profileRes?.id);
        if (deleteRes?.affected) {
          return { message: MESSAGES.DELETE_SUCCESS };
        } else {
          this.logger.warn(MESSAGES.USER_NOT_FOUND);
          throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
        }
      } else {
        this.logger.warn(MESSAGES.USER_NOT_FOUND);
        throw new NotFoundException(MESSAGES.PROFILE_NOT_FOUND);
      }
    } else {
      this.logger.warn(MESSAGES.USER_NOT_FOUND);
      throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
    }
  }
}
