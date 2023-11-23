import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TestCacheController } from './test-cache/test-cache.controller';
import { ScheduleService } from './schedule/schedule.service';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    PrismaModule,
    ScheduleModule.forRoot(),
    CacheModule.register({
      ttl: 5, // seconds
      max: 100, // maximum number of items in cache
      isGlobal: true,
    }),
  ],
  controllers: [AppController, UserController, TestCacheController],
  providers: [
    AppService,
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    ScheduleService,
  ],
})
export class AppModule {}
