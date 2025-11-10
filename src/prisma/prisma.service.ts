import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Call super() with optional logging config
    super({
      log: ['query', 'info', 'warn', 'error'], // optional, enables Prisma engine logs
    });
  }
  async onModuleInit() {
    await this.$connect();

    //@ts-ignore
    this.$on('query', (e: any) => {
      console.log('Duration: ' + e.duration + 'ms');
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
