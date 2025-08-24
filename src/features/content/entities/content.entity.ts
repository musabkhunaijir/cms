import { Category } from 'src/features/categories/entities/category.entity';
import { MainEntity } from 'src/shared/db/main-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Content extends MainEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  categoryId: number;

  // Relationship
  @ManyToOne(() => Category, (category) => category.contents, {
    nullable: true,
    onDelete: 'SET NULL', // optional: you can use CASCADE, RESTRICT, etc.
  })
  @JoinColumn({ name: 'categoryId' }) // links the FK to the relation
  category: Category;
}
