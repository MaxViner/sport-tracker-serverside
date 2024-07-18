export class CreateRunningWorkoutDto {
    WorkoutType: string;
    id: number;
    UserId:string;
    WorkoutDate: string;
    RunningDuration: number;
    RunningResults: { distance: number,pace:number, workTime: number, restTime: number }[];
    IntervalsCount: number;
    IsCompleted:boolean;
  }