// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';
// import { PrismaModule } from '../src/prisma/prisma.module';
// import { PrismaService } from '../src/prisma/prisma.service';

global.afterAll(async () => {
  //   try {
  //     const moduleFixture: TestingModule = await Test.createTestingModule({
  //       imports: [AppModule, PrismaModule],
  //     }).compile();
  //     const app = moduleFixture.createNestApplication();
  //     const prisma = app.get(PrismaService);
  //     await app.init();
  //     await prisma.raw('DROP DATABASE');
  //   } catch (e) {}
});
