import { Module } from '@nestjs/common';
import { CategorySubLevel1Module } from './category-sub-level-1/category-sub-level-1.module';
import { ItemModule } from './item/item.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategorySubLevel2Module } from './category-sub-level-2/category-sub-level-2.module';

@Module({
  imports: [CategorySubLevel1Module, ItemModule, PrismaModule, CategorySubLevel2Module],
  controllers: [],
  providers: [],
})
export class AppModule { }
