import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AuthRole } from './enums/auth-role.enum.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  postalCode: string;

  @Column({ default: false })
  isBan: boolean;

  @Column({ default: AuthRole.USER })
  role: AuthRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
