import { MainEntity } from 'src/shared/db/main-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Content extends MainEntity {
  @Column()
  title: string;

  @Column()
  description: string;
}
