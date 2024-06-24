import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { errorLog } from './error/errorLog.model';
import { Model } from 'mongoose';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  constructor(@InjectModel(errorLog.name) private errorLogModel: Model<errorLog>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        console.log(`tempo de resposta: ${responseTime}ms`);
      }),
      catchError(err => {
        const request = context.switchToHttp().getRequest()
        const route = request.route.path

        this.errorLogModel.create({
          errorDate: Date.now,
          errorRoute: route,
          error: err
        })

        return throwError(() => err);
        
      }),
    );
  }
}