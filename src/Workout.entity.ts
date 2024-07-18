import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  WorkoutId: number;

  @Column()
  UserId:string;

  @Column()
  WorkoutDate: string;

  @Column()
  WorkoutType: string;

  @Column({default:false})
  IsCompleted:boolean;

}