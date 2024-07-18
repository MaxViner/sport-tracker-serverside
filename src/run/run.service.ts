import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RunningWorkout } from './run.entity';
import { CreateRunningWorkoutDto } from './dto/createRunningWorkout.dto';

@Injectable()
export class RunService {
  constructor(
    @InjectRepository(RunningWorkout)
    private readonly runningWorkoutRepository: Repository<RunningWorkout>,
  ) {}

  async findAll(): Promise<RunningWorkout[]> {
    return this.runningWorkoutRepository.find();
  }

  async findByUserId(UserId: string): Promise<RunningWorkout[]> {
    return this.runningWorkoutRepository.find({ where: { UserId } });
  }

  async createRunningWorkout(createRunningWorkoutDto: CreateRunningWorkoutDto) {
  
    const runningWorkout = this.runningWorkoutRepository.create({
        ...createRunningWorkoutDto,
    });
    console.log(createRunningWorkoutDto);
    
    const savedWorkout = await this.runningWorkoutRepository.save(runningWorkout); 
    console.log(savedWorkout);
    
    return savedWorkout;
}
}