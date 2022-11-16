import {
    CanActivate,
    ExecutionContext
} from '@nestjs/common';

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        console.log("AuthGuard -> canActivate -> request", request.currentUser)
        return request.session.userId;
    }
}