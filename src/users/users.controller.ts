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
  UseGuards,
} from '@nestjs/common';
import { UsersDTO } from './dto/users.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/user-login.dto';
import { SignUpDto } from './dto/user.signUp.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enum/role.enum';
import { RolesGuard } from '../auth/role-guard';
import { UpdateUserDto } from './dto/user.update.dto';

/**
 * Users controller handle to request and response for users
 */
@Controller('users')
export class UsersController {
  logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  /**
   * Fetch list of users
   * @returns List of users
   */
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAllUsers(): Promise<UsersDTO | object> {
    return await this.usersService.getAllUsers();
  }

  /**
   * Fetch user by id
   * @param id user id
   * @returns User details
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UsersDTO | object> {
    return await this.usersService.getUserById(id);
  }

  /**
   * Create new user
   * @param signUpDto name, username, email, password and role
   * @returns Newely created user
   */
  @Post('register')
  async register(@Body() signUpDto: SignUpDto): Promise<SignUpDto | object> {
    return await this.usersService.register(signUpDto);
  }

  /**
   * User login
   * @param loginUserDto email and password
   * @returns Token
   */
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UsersDTO | object> {
    return await this.usersService.login(loginUserDto);
  }

  /**
   * Update existing user details
   * @param id user id
   * @param updateUserDto name, mobile number, address and image content
   * @returns Number of affected row
   */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UsersDTO | object> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  /**
   * Delete user by id
   * @param id user id
   * @returns Number of affected row
   */
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UsersDTO | object> {
    return await this.usersService.deleteUser(id);
  }
}
