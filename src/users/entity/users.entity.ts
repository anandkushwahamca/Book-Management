import { GenericEntity } from '../../common/generic/generic.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../common/enum/role.enum';
import { Profile } from './profile.entity';

@Entity('users')
export class Users extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  username: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.Guest })
  role: Role;

  @OneToOne(() => Profile, (profile) => profile.users, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
