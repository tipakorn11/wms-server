import { Module } from '@nestjs/common';
import { CategorySubLevel1Service } from './category-sub-level-1.service';
import { CategorySubLevel1Controller } from './category-sub-level-1.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CategorySubLevel1Controller],
  providers: [CategorySubLevel1Service],
  imports: [PrismaModule]
})
export class CategorySubLevel1Module {}
