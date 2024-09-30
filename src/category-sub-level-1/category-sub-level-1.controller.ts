import { Controller, Get, Post, Put, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { CategorySubLevel1Service } from './category-sub-level-1.service';
import {
  CreateCategorySubLevel1Dto,
  UpdateCategorySubLevel1Dto,
  CategorySubLevel1Dto,
  AddSubLevel2Dto,
  RemoveSubLevel2Dto
} from './dto/category-sub-level-1.dto';

@Controller('/api/v1/category-sub-level-1')
export class CategorySubLevel1Controller {
  constructor(
    private readonly categorySubLevel1Service: CategorySubLevel1Service,
  ) { }

  @Post()
  create(@Body() createCategorySubLevel1Dto: CreateCategorySubLevel1Dto): Promise<CategorySubLevel1Dto> {
    return this.categorySubLevel1Service.create(createCategorySubLevel1Dto);
  }

  @Get()
  findAll() {
    return this.categorySubLevel1Service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categorySubLevel1Service.findOne(+id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategorySubLevel1Dto: UpdateCategorySubLevel1Dto) {
    return this.categorySubLevel1Service.update(+id, updateCategorySubLevel1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorySubLevel1Service.remove(+id);
  }

  @Put(':id/add-sub-level-2')
  addSubLevel2(@Param('id') id: string, @Body() addDto: AddSubLevel2Dto): Promise<CategorySubLevel1Dto> {
    return this.categorySubLevel1Service.addSubLevel2({ ...addDto, subLevel1Id: +id });
  }

  @Put(':id/remove-sub-level-2')
  removeSubLevel2(@Param('id') id: string, @Body() removeDto: RemoveSubLevel2Dto): Promise<CategorySubLevel1Dto> {
    return this.categorySubLevel1Service.removeSubLevel2({ ...removeDto, subLevel1Id: +id });
  }

  @Get(':id/with-sub-levels')
  async getWithSubLevels(@Param('id') id: string): Promise<CategorySubLevel1Dto> {
    const category = await this.categorySubLevel1Service.getWithSubLevels2(+id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }
}