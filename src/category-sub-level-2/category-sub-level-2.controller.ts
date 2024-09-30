import { Controller, Get, Post, Body, Patch, Param, NotFoundException } from '@nestjs/common';
import { CategorySubLevel2Service } from './category-sub-level-2.service';
import { 
  CreateCategorySubLevel2Dto, 
  UpdateCategorySubLevel2Dto,
  CategorySubLevel2Dto
} from './dto/category-sub-level-2.dto';

@Controller('/api/v1/category-sub-level-2')
export class CategorySubLevel2Controller {
  constructor(private readonly categorySubLevel2Service: CategorySubLevel2Service) {}

  @Post()
  create(@Body() createCategorySubLevel2Dto: CreateCategorySubLevel2Dto): Promise<CategorySubLevel2Dto> {
    return this.categorySubLevel2Service.create(createCategorySubLevel2Dto);
  }

  @Patch(':id')
  updateLevel2(@Param('id') id: string, @Body() updateCategorySubLevel2Dto: UpdateCategorySubLevel2Dto): Promise<CategorySubLevel2Dto> {
    return this.categorySubLevel2Service.updateLevel2(+id, updateCategorySubLevel2Dto);
  }

  @Get(':id/with-sub-levels')
  async getWithSubLevels(@Param('id') id: string): Promise<CategorySubLevel2Dto> {
    const category = await this.categorySubLevel2Service.getWithSubLevels1(+id);
    if (!category) {
      throw new NotFoundException(`Category Sub Level 2 with ID ${id} not found`);
    }
    return category;
  }
}