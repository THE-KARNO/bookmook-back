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

  @Column()
  publisher: string;

  @Column()
  price: number;

  @Column({ default: ScoreEnum.GREAT })
  score: ScoreEnum;

  @Column()
  category: string;

  @Column()
  ISBN: string;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
