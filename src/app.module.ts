import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RunModule } from './run/run.module'
import { RunningWorkout } from './run/run.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunRepository } from './run/run.repository'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}), 
    TypeOrmModule.forRootAsync(
      {
        imports:[ConfigModule],
        useFactory: (configService:ConfigService)=>(
          {
            type:'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            entities: [__dirname + '/**/*.entity{.ts, .ts}'],
            synchronize: true,
            autoLoadEntities: true,
          }
        ),
        inject:[ConfigService],
  }
),
  RunModule,
  UserModule,
  AuthModule],
  controllers: [AppController],
  providers: [AppService, RunRepository],
})
export class AppModule {}
