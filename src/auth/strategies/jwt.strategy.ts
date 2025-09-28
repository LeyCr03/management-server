import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { env } from 'src/env';
import { UserService } from 'src/service/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy, 'jwt') {
    constructor(
        private userService: UserService, 
      ) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false, 
          secretOrKey: env.JWT_SECRET,
        });
      }

      async validate( payload: any) {
        const user = await this.userService.findById(payload.sub);
        if (!user) {
            throw new UnauthorizedException( 'user not found');
        }
        const { password, ...results} = user;
        return { userId: payload.sub, email: payload.email };
      }
}