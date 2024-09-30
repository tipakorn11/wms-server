// item.dto.ts
import { IsString, IsNumber, IsOptional, IsInt, Min,  IsUrl, } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsInt()
  category_sub_level_1: number;  

  @IsOptional()
  @IsString()  
  item_img?: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsInt()
  @Min(0)
  amount: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  cost_price: number;
}

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  category_sub_level_1_id?: number;

  @IsOptional()
  @IsUrl()
  item_img?: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  amount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cost_price?: number;
}

export class ItemDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsInt()
  category_sub_level_1_id: number;

  @IsOptional()
  @IsUrl()
  item_img?: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsInt()
  @Min(0)
  amount: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  cost_price: number;
}