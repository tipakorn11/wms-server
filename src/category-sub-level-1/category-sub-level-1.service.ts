import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCategorySubLevel1Dto,
  UpdateCategorySubLevel1Dto,
  CategorySubLevel1Dto,
  AddSubLevel2Dto,
  RemoveSubLevel2Dto
} from './dto/category-sub-level-1.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
@Injectable()
export class CategorySubLevel1Service {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateCategorySubLevel1Dto): Promise<CategorySubLevel1Dto> {
    await this.validateDto(data);
    const created = await this.prisma.category_sub_level_1.create({
      data: {
        name: data.name,
        desc: data.desc,
      },
    });
    return plainToClass(CategorySubLevel1Dto, created);
  }

  async addSubLevel2(data: AddSubLevel2Dto): Promise<CategorySubLevel1Dto> {
    await this.validateDto(data);
    const updated = await this.prisma.category_sub_level_1.update({
      where: { id: data.subLevel1Id },
      data: {
        Category_sub_level_2: {
          connect: { id: data.subLevel2Id }
        }
      },
      include: { Category_sub_level_2: true }
    });
    return plainToClass(CategorySubLevel1Dto, updated);
  }

  async removeSubLevel2(data: RemoveSubLevel2Dto): Promise<CategorySubLevel1Dto> {
    await this.validateDto(data);
    const updated = await this.prisma.category_sub_level_1.update({
      where: { id: data.subLevel1Id },
      data: {
        Category_sub_level_2: {
          disconnect: { id: data.subLevel2Id }
        }
      },
      include: { Category_sub_level_2: true }
    });
    return plainToClass(CategorySubLevel1Dto, updated);
  }

  async getWithSubLevels2(id: number): Promise<CategorySubLevel1Dto | null> {
    const category = await this.prisma.category_sub_level_1.findUnique({
      where: { id },
      include: { Category_sub_level_2: true }
    });
    return category ? plainToClass(CategorySubLevel1Dto, category) : null;
  }
  findAll() {
    return this.prisma.category_sub_level_1.findMany();
  }

  findOne(id: number) {
    return this.prisma.category_sub_level_1.findUnique({ where: { id } });
  }

  update(id: number, updateCategorySubLevel1Dto: UpdateCategorySubLevel1Dto) {
    return this.prisma.category_sub_level_1.update({
      where: { id },
      data: updateCategorySubLevel1Dto
    });
  }

  remove(id: number) {
    return this.prisma.category_sub_level_1.delete({ where: { id } });
  }
  private async validateDto(dto: object): Promise<void> {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.toString()}`);
    }
  }

}


