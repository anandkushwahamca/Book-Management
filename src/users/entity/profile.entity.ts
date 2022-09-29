import { GenericEntity } from '../../common/generic/generic.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity('profile')
export class Profile extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'mobile_number', type: 'bigint', nullable: true })
  mobileNumber: number;

  @Column({ name: 'address', type: 'varchar', nullable: true })
  address: string;

  @Column({ name: 'image_content', type: 'bytea', nullable: true })
  imageContent: string;

  @OneToOne(() => Users, (users) => users.profile)
  users: Users;
}
