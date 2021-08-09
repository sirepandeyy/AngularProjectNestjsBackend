import { baseEnity } from './../BaseEntity.ts/baseEntity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Contact extends baseEnity {
  
  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  city: string;
}