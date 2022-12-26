import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Org } from '@prisma/client';

@Injectable()
export class AdminOrgsService {
  constructor(private prisma: PrismaService) {}
  getList(): Promise<Org[]> {
    return this.prisma.org.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
    });
  }
}
