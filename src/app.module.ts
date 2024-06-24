import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ErrorModule } from './error/errorLog.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/valorant-hub'),
    CharacterModule,
    UserModule,
    AuthModule,
    ErrorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
