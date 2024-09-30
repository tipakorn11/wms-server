import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto, UpdateItemDto, ItemDto } from './dto/item.dto';

@Controller('/api/v1/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<ItemDto> {
    return this.itemService.create(createItemDto);
  }

  @Get()
  async findAll(): Promise<ItemDto[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ItemDto> {
    const item = await this.itemService.findOne(+id);
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Promise<ItemDto> {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ItemDto> {
    return this.itemService.remove(+id);
  }
}