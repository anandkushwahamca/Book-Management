import { GenericEntity } from '../common/generic/generic.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../book/book.entity';

@Entity('author')
export class Author extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @OneToMany(() => Book, (book) => book.author, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  book: Book[];
}
