import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {

  @PrimaryGeneratedColumn()
  UserId:string;

  @Column()
  UserEmail: string;

  @Column()
  UserPassword: string;
}
// { UserEmail: '23@mail.ru', UserPassword: '2Er!wwwwwweww' }