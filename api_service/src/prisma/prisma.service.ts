import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    // ALSO IGNORE DELETED USERS ON COUNT!!!
    this.$use(async (params, next) => {
      if (params.model == 'User') {
        if (params.action === 'findUnique' || params.action === 'findFirst') {
          // Change to findFirst - you cannot filter
          // by anything except ID / unique with findUnique
          params.action = 'findFirst';
          // Add 'deleted' filter
          // ID filter maintained
          params.args.where['deleted'] = false;
        }
        if (params.action === 'findMany' || params.action === 'count') {
          // Find many queries
          if (params.args.where) {
            if (params.args.where.deleted == undefined) {
              // Exclude deleted records if they have not been explicitly requested
              params.args.where['deleted'] = false;
            }
          } else {
            params.args['where'] = { deleted: false };
          }
        }
      }
      return next(params);
    });

    this.$use(async (params, next) => {
      if (params.model == 'User') {
        if (params.action == 'update') {
          // Change to updateMany - you cannot filter
          // by anything except ID / unique with findUnique
          params.action = 'updateMany';
          // Add 'deleted' filter
          // ID filter maintained
          params.args.where['deleted'] = false;
        }
        if (params.action == 'updateMany') {
          if (params.args.where != undefined) {
            params.args.where['deleted'] = false;
          } else {
            params.args['where'] = { deleted: false };
          }
        }
      }
      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
