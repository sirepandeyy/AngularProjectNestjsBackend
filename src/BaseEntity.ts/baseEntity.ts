import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class baseEnity{ 
    @PrimaryGeneratedColumn()
    id: number;
}