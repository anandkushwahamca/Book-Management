import { GenericEntity } from '../common/generic/generic.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from '../author/author.entity';
import { Status } from '../common/enum/status.enum';

@Entity('book')
export class Book extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'book_name', type: 'varchar', unique: true })
  bookName: string;

  @Column({ name: 'book_price', type: 'integer' })
  bookPrice: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'integer' })
  pages: number;

  @Column({ type: 'varchar', nullable: true })
  details: string;

  @Column({ type: 'enum', enum: Status, default: Status.Available })
  status: Status;

  @ManyToOne(() => Author, (author) => author.book)
  @JoinColumn({ name: 'auhor_id' })
  author: Author;
}
