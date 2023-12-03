import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

const convertTotalPage = (total_page: number) => {
  let res = ''
  switch (true) {
    case total_page <= 100:
      res = 'tipis'
      break
    case total_page > 100 && total_page <= 200:
      res = 'sedang'
      break
    case total_page > 201:
      res = 'tebal'
      break
    default:
      res = ''
  }
  return res
}

const addThickness = (book: any) => {
  if (book.total_page) {
    book.thickness = convertTotalPage(book.total_page)
  }
  return book
}

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('books')
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {   
    return this.bookService.create(addThickness(createBookDto));
  }

  @Get('books')
  async findAll(@Query() queryParams: any): Promise<Book[]> {
    return this.bookService.findAll(queryParams);
  }

  @Get('books/:id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(+id);
  }

  @Get('categories/:id/books')
  findBooksByCategory(@Param('id') id: string, @Query() queryParams: any) {
    return this.bookService.findAll(queryParams, +id);
  }

  @Patch('books/:id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, addThickness(updateBookDto));
  }

  @Delete('books/:id')
  async remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
