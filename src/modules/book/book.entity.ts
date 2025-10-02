import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ScoreEnum } from './enum/score.enum.js';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  translator: string;

  @Column({ unique: true })
  publisher: string;

  @Column()
  price: number;

  @Column()
  score: ScoreEnum;

  @Column()
  category: string;

  @Column()
  ISBN: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
