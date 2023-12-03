import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsOptional, IsString, IsNumber, IsMongoId } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class UpdateBookDto {// extends PartialType(CreateBookDto) {
  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsString()
  @IsOptional()
  image_url: string

  @IsNumber()
  @IsOptional()
  release_year: number

  @IsString()
  @IsOptional()
  price: string

  @IsNumber()
  @IsOptional()
  total_page: number

  @IsMongoId()
  @IsOptional()
  category_id: Category
}