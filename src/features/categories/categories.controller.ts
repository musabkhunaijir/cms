import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JoiValidationPipe } from 'src/shared/pipes/joi-validation-pipe';
import { createCategorySchema } from './validations';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createCategorySchema))
  @HttpCode(HttpStatus.CREATED)
  addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.addCategory(createCategoryDto);
  }

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
