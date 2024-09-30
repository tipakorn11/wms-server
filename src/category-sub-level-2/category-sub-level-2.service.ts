import { Injectable } from '@nestjs/common';
import {
  CreateCategorySubLevel2Dto,
  UpdateCategorySubLevel2Dto,
  CategorySubLevel2Dto,
} from './dto/category-sub-level-2.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
@Injectable()
export class CategorySubLevel2Service {
  constructor(private prisma: PrismaService) { }

    async create(data: CreateCategorySubLevel2Dto): Promise<CategorySubLevel2Dto> {
      await this.validateDto(data);
      const created = await this.prisma.category_sub_level_2.create({ data });
      return plainToClass(CategorySubLevel2Dto, created);
    }
  
    async updateLevel2(id: number, data: UpdateCategorySubLevel2Dto): Promise<CategorySubLevel2Dto> {
      await this.validateDto(data);
      const updated = await this.prisma.category_sub_level_2.update({
        where: { id },
        data
      });
      return plainToClass(CategorySubLevel2Dto, updated);
    }
  
    async getWithSubLevels1(id: number): Promise<CategorySubLevel2Dto | null> {
      const category = await this.prisma.category_sub_level_2.findUnique({
        where: { id },
        include: { category_sub_level_1: true }
      });
      return category ? plainToClass(CategorySubLevel2Dto, category) : null;
    }
  
    private async validateDto(dto: object): Promise<void> {
      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.toString()}`);
      }
    }
  
  
  }
  // create(createCategorySubLevel2Dto: CreateCategorySubLevel2Dto) {
  //   return 'This action adds a new categorySubLevel2';
  // }

  // findAll() {
  //   return `This action returns all categorySubLevel2`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} categorySubLevel2`;
  // }

  // update(id: number, updateCategorySubLevel2Dto: UpdateCategorySubLevel2Dto) {
  //   return `This action updates a #${id} categorySubLevel2`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} categorySubLevel2`;
  // }
