import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Next
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassContructor {
    new (...args: any[]): {}
}

export function Serialize(dto: ClassContructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // Run sth. before handler
        return handler.handle().pipe(
            map((data: any) => {
                // Run sh. after handler

            return plainToClass(this.dto, data, {
                excludeExtraneousValues: true, // only add to response propertyes we listed and set @Expose()
            });
            })
        )
    }
}