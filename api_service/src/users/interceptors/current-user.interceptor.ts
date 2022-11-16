import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable
} from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    async intercept(context: ExecutionContext, handler: CallHandler): Promise<Observable<any>> {
        // const request = context.switchToHttp().getRequest();
        // const { userId } = request.session || {};

        // if(userId) {
        //     const user = await this.usersService.findOne(userId);
        //     request.currentUser = user;
        // }
        return handler.handle();
    }
}