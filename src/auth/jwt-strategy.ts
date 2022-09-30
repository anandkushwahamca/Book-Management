import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/repository/users.repository';
import { JwtPayload } from '../common/payload/jwt-payload';

/**
 * Create user jwtStrategy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * User validate
   * @param payload email
   * @returns User details
   */
  async validate(payload: JwtPayload) {
    try {
      const { email } = payload;
      const res = await this.userRepository.findOneByOrFail({ email: email });
      return res;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
