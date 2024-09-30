import { IsString, IsOptional, IsNumber, IsArray, ValidateNested, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

// DTOs for Category_sub_level_1

export class CreateCategorySubLevel1Dto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  sub_level_2_ids: number[];
}

export class UpdateCategorySubLevel1Dto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  desc?: string;
}

export class CategorySubLevel1Dto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategorySubLevel2Dto)
  Category_sub_level_2: CategorySubLevel2Dto[];
}

// DTOs for Category_sub_level_2

export class CreateCategorySubLevel2Dto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  desc?: string;
}

export class UpdateCategorySubLevel2Dto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  desc?: string;
}

export class CategorySubLevel2Dto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  desc?: string;
}

// DTOs for relational operations

export class AddSubLevel2Dto {
  @IsInt()
  @Min(1)
  subLevel1Id: number;

  @IsInt()
  @Min(1)
  subLevel2Id: number;
}

export class RemoveSubLevel2Dto {
  @IsInt()
  @Min(1)
  subLevel1Id: number;

  @IsInt()
  @Min(1)
  subLevel2Id: number;
}