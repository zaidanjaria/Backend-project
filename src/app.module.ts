import { Module } from '@nestjs/common';
import { ExpenseModule } from './expense/expense.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ExpenseModule, PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
