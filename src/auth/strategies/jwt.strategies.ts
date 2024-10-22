import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../models/jwt-payload.model';
import { User } from 'src/users/models/users.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: authService.returnJwtExtractor(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validade(jwtPayload: JwtPayload): Promise<User> {
    const user = await this.authService.validadeUser(jwtPayload);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
