import { Module } from '@nestjs/common';
import { RunService } from './run.service';
import { runController } from './run.controller';
import { RunningWorkout } from './run.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunRepository } from './run.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RunningWorkout])],
  controllers: [runController],
  providers: [RunService, RunRepository],
  exports: [RunService, RunRepository, ],
})
export class RunModule {}
