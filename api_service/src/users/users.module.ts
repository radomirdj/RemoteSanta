import { Module, MiddlewareConsumer } from '@nestjs/common';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';

import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { AwsCognitoService } from './aws-cognito/aws-cognito.service';

@Module({
  imports: [ PrismaModule ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, AwsCognitoService
  //   , {
  //   provide: APP_INTERCEPTOR,
  //   useClass: CurrentUserInterceptor
  // }
]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
