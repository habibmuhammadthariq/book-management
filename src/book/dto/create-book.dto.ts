import { IsNotEmpty, IsString, IsNumber, IsMongoId, Min, Max } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @IsString()
  @IsNotEmpty()
  readonly description: string

  @IsString()
  @IsNotEmpty()
  readonly image_url: string

  @IsNumber()
  @IsNotEmpty()
  @Min(1980)
  @Max(2021)
  readonly release_year: number

  @IsString()
  @IsNotEmpty()
  readonly price: string

  @IsNumber()
  @IsNotEmpty()
  readonly total_page: number

  // @IsMongoId()
  @IsNumber()
  @IsNotEmpty()
  readonly category_id: Category
}