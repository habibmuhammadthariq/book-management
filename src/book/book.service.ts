import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>
  ) {}

  async create(createBookDto: Book): Promise<Book> {
    const res = await this.bookRepository.create(createBookDto)
    await this.bookRepository.save(res)
    return res
  }

  async findAll(queryParams: any): Promise<Book[]> {
    const query = this.bookRepository.createQueryBuilder('Book')

    if (queryParams.title) {
      query.andWhere('Book.title = :title', { title: queryParams.title })
    }
    if (queryParams.minYear) {
      query.andWhere('Book.release_year >= :minYear', { minYear: queryParams.minYear })
    }
    if (queryParams.maxYear) {
      query.andWhere('Book.release_year <= :maxYear', { maxYear: queryParams.maxYear })
    }
    if (queryParams.minPage) {
      query.andWhere('Book.total_page >= :minPage', { minPage: queryParams.minPage })
    }
    if (queryParams.maxPage) {
      query.andWhere('Book.total_page <= :maxPage', { maxPage: queryParams.maxPage })
    }
    if (queryParams.sortByTitle) {
      const order = queryParams.sortByTitle.toLowerCase() === 'desc' ? 'DESC' : 'ASC'
      query.orderBy('Book.title', order)
    }
    
    return await query.getMany()
  }

  async findOne(id: number): Promise<Book> {

    const res = await this.bookRepository.findOneBy({ id })    
    if (!res) {
      throw new NotFoundException('User not found')
    }
    return res;
  }

  async update(id: number, updateBookDto: Book) {
    await this.bookRepository.update(id, updateBookDto)
    const res = await this.bookRepository.findOneBy({ id })
    if (!res) {
      throw new NotFoundException('User not found')
    }
    return res
  }

  async remove(id: number) {
    const res = await this.bookRepository.delete(id)
    if (!res.affected) { 
      throw new NotFoundException('Category not found') 
    }
    return res;
  }
}
