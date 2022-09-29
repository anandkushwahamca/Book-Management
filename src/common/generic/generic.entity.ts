import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class GenericEntity {
  @CreateDateColumn({ name: 'created_on', type: 'date' })
  createdOn: Date;

  @UpdateDateColumn({
    name: 'updated_on',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  updatedOn: Date;
}
