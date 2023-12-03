import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm'
import { Category } from "src/category/entities/category.entity"

export enum Thickness {
  thin = 'tipis', 
  medium = 'sedang',
  thick = 'tebal'
}

@Entity()
export class Book{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string
  
  @Column()
  image_url: string
  
  @Column()
  release_year: number

  @Column()
  price: string

  @Column()
  total_page: number

  @Column()
  thickness: Thickness

  @ManyToOne(() => Category, (category) => category.id)
  category: Category

  @Column({ name: 'category_id' })
  category_id: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
