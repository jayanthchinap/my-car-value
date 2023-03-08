import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('User Inserted with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Log Updated with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Log Removed with id', this.id);
  }
}
