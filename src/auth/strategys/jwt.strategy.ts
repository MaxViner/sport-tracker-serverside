import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService)
    {   
      const jwtSecret = configService.get<string>('JWT_SECRET');   
      super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: User) {
    console.log('====================================');
    console.log(payload);
    console.log('====================================');
    return { UserId: payload.UserId, UserEmail: payload.UserEmail };
  }
}