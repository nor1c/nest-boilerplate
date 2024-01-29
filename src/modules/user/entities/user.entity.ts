import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
  })
  username: string;

  @Column('varchar', {
    nullable: false,
  })
  password: string;

  @Column('varchar', {
    nullable: false,
  })
  name: string;

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt: Date;
}
