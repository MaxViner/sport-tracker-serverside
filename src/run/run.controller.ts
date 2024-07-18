import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RunService } from './run.service';
import { RunningWorkout } from './run.entity';
import { CreateRunningWorkoutDto } from './dto/createRunningWorkout.dto';

@Controller('run')
export class runController {
  constructor(private readonly runService: RunService) {}

  @Get()
  async findAll(): Promise<RunningWorkout[]> {
    return this.runService.findAll();
  }
  @Get(':UserId')
  async findByUserId(@Param('UserId') UserId: string): Promise<RunningWorkout[]> {
    console.log(UserId);
    
    return this.runService.findByUserId(UserId);
  }

  @Post()
  async create(@Body() createRunningWorkoutDto: CreateRunningWorkoutDto) {
    return this.runService.createRunningWorkout(createRunningWorkoutDto);
  }
}