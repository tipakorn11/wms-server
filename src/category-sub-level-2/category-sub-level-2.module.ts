import { Module } from '@nestjs/common';
import { CategorySubLevel2Service } from './category-sub-level-2.service';
import { CategorySubLevel2Controller } from './category-sub-level-2.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  controllers: [CategorySubLevel2Controller],
  providers: [CategorySubLevel2Service],
  imports: [PrismaModule]

})
export class CategorySubLevel2Module {}
