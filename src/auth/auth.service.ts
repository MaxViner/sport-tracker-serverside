import { UnauthorizedException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(UserEmail: string, UserPassword: string): Promise<any> {
    console.log('============validateUser=====================');
    console.log(UserEmail);
    console.log('====================================');
    const user = await this.userService.findOne(UserEmail);
    
    const  passwordIsMatchedded = await argon2.verify(UserPassword, user.UserPassword);
    if (user && passwordIsMatchedded) {
      return user;
    }
    throw new UnauthorizedException("User data uncorrect");
  }

  async login(user: User) {
    console.log('user');
    console.log(user);
   
    const payload = { UserEmail: user.UserEmail, sub: user.UserPassword };
    console.log('=======payload======================');
    console.log(payload);
  
    return {
      ...payload,
      access_token: this.jwtService.sign(payload),
    };
  }

}