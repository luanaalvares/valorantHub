import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ErrorModule } from './error/errorLog.module';
import { ErrorLogSchema, errorLog } from './error/schema/errorLog.schema';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppInterceptor } from './app.interceptor';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/valorant-hub'),
    MongooseModule.forFeature([{ name: errorLog.name, schema: ErrorLogSchema }]),
    CharacterModule,
    UserModule,
    AuthModule,
    ErrorModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
  ],
})
export class AppModule { }
