import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto, UpdateItemDto, ItemDto } from './dto/item.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateItemDto): Promise<ItemDto> {
    await this.validateDto(data);

    const categorySubLevel1 = await this.prisma.category_sub_level_1.findUnique({
      where: { id: data.category_sub_level_1 }
    });

    if (!categorySubLevel1) {
      throw new NotFoundException(`Category Sub Level 1 with ID ${data.category_sub_level_1} not found`);
    }

    const created = await this.prisma.item.create({
      data: {
        ...data,
        category_sub_level_1: { connect: { id: data.category_sub_level_1 } }
      }
    });
    return plainToClass(ItemDto, created);
  }

  async findAll(): Promise<ItemDto[]> {
    const items = await this.prisma.item.findMany();
    return items.map(item => plainToClass(ItemDto, item));
  }

  async findOne(id: number): Promise<ItemDto | null> {
    const item = await this.prisma.item.findUnique({ where: { id } });
    return item ? plainToClass(ItemDto, item) : null;
  }

  async update(id: number, data: UpdateItemDto): Promise<ItemDto> {
    await this.validateDto(data);
    const updated = await this.prisma.item.update({
      where: { id },
      data,
    });
    return plainToClass(ItemDto, updated);
  }

  async remove(id: number): Promise<ItemDto> {
    const deleted = await this.prisma.item.delete({ where: { id } });
    return plainToClass(ItemDto, deleted);
  }

  private async validateDto(dto: object): Promise<void> {
    const errors = await validate(dto);
    if (errors.length > 0) {
      const errorMessages = errors.map(error =>
        Object.values(error.constraints).join(', ')
      ).join('; ');
      throw new BadRequestException(`Validation failed: ${errorMessages}`);
    }
  }
}