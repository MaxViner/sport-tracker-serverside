import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  fineOne(id:string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDro:CreateUserDto){
    console.log('==========createUserDro=================');
    console.log(createUserDro);
    console.log('====================================');
    return this.userService.create(createUserDro)
  }
}
