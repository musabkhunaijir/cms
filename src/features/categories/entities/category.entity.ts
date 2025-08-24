import { Content } from 'src/features/content/entities/content.entity';
import { MainEntity } from 'src/shared/db/main-entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Category extends MainEntity {
  @Column()
  name: string;

  @OneToMany(() => Content, (content) => content.category)
  contents: Content[];
}
