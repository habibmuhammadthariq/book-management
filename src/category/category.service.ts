import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const res = await this.categoryRepository.create(createCategoryDto)
    await this.categoryRepository.save(res)
    return res
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find()
    return categories
  }

  async findOne(id: number): Promise<Category | null> {
    const category = await this.categoryRepository.findOneBy({ id })
    if (!category) {
      throw new NotFoundException('Category not found')
    }
    return category
  }

  async findBooksByCategory(id: number, queryParams: any) {
    const { title, minYear, maxYear, minPage, maxPage, sortByTitle } = queryParams

    const query = this.categoryRepository.createQueryBuilder('category')
      .leftJoinAndSelect('category.books', 'book')
      .where('category.id = :id', { id })
    if (sortByTitle) query.orderBy('book.title', sortByTitle.toUpperCase())
    if (title) query.where('book.title = :title', { title })
    if (minYear) query.where('book.release_year >= :minYear', { minYear })
    if (maxYear) query.where('book.release_year <= :maxYear', { maxYear })
    if (minPage) query.where('book.total_page <= :minPage', { minPage })
    if (maxPage) query.where('book.total_page <= :maxPage', { maxPage })
    const category = query.getOne()
  
    if (!category) {
      throw new NotFoundException('Category not found')
    }
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepository.update(id, updateCategoryDto)
    const res = await this.categoryRepository.findOneBy({ id })
    if (!res) {
      throw new NotFoundException('User not found')
    }
    return res
  }

  async remove(id: number) {
    const res = await this.categoryRepository.delete(id)
    if (!res.affected) { 
      throw new NotFoundException('Category not found') 
    }
    return { message: 'success' }
  }
}
