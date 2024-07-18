// workout.entity.ts
import { Workout } from 'src/Workout.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';




@Entity()
export class RunningWorkout extends Workout {
  
  @Column()
  RunningDuration: number;

  @Column('jsonb')
  RunningResults: { distance: number,pace:number, workTime: number, restTime: number }[];

  @Column({ nullable: true })
  IntervalsCount: number;
}
