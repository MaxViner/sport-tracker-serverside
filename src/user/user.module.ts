import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports:[TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
        useFactory:(configService:ConfigService)=>({
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '60s' },
        }),
        inject: [ConfigService],
      }),],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserModule, UserService]
})
export class UserModule {
    
}
