import { EntityRepository, Repository } from 'typeorm';
import { RunningWorkout } from './run.entity';

@EntityRepository(RunningWorkout)
export class RunRepository extends Repository<RunningWorkout> {}