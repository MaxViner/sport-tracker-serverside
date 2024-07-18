import {IsEmail, MinLength} from 'class-validator'

export class CreateUserDto{
    @IsEmail()
    UserEmail:string;

    @MinLength(6,{message:'more then 6'})
    UserPassword:string

   
}