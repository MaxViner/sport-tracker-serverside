import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt';
@Injectable()

export class UserService {

    constructor (
        @InjectRepository(User) private readonly userRepository:Repository<User>,
        private readonly jwtService:JwtService,
    ){}

    async findOne(UserEmail: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where:{UserEmail}
        })
      }

  async create(createUserDro:CreateUserDto){
    const isUserExist = await this.userRepository.findOne({
        where:{UserEmail:createUserDro.UserEmail}
    })
    if (isUserExist) {
        throw new BadRequestException('This email alredy exist')
    }
    else{
        const user = await this.userRepository.save(
            {
                UserEmail:createUserDro.UserEmail,
                UserPassword: await argon2.hash(createUserDro.UserPassword)
            }
        )
        const token  = this.jwtService.sign({UserEmail:createUserDro.UserEmail})
        return {user, token}
    }
  }
}
