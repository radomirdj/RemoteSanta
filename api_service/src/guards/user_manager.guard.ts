import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRoleEnum } from '@prisma/client';

export class UserManagerGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.user) return false;
    return request.user.userRole === UserRoleEnum.USER_MANAGER;
  }
}
