import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import {ConfigService, ConfigModule } from '@nestjs/config'
import { JwtStrategy } from './strategys/jwt.strategy';

@Module({
  imports:[UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory:(configService:ConfigService)=>({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
