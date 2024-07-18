import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'UserEmail' });
  }

  async validate(UserEmail: string, UserPassword: string): Promise<any> {
    console.log('==========UserEmail=======================');
    console.log(UserEmail);
    console.log('====================================');
    const user = await this.authService.validateUser(UserEmail, UserPassword);
    if (!user) {
      throw new UnauthorizedException('Something bad happened', { cause: new Error(), description: 'Some error description' })    }
    return user;
  }
}