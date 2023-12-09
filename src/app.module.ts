import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TestCacheController } from './test-cache/test-cache.controller';
import { ScheduleService } from './schedule/schedule.service';
import { ScheduleModule } from '@nestjs/schedule';
import { FilesController } from './files/files.controller';
import { WebSocketModule } from './web-socket/web-socket.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottleController } from './throttle/throttle.controller';
import { AllExceptionFilter } from './all-exceptions.filter';

@Module({
  imports: [
    PrismaModule,
    ScheduleModule.forRoot(),
    CacheModule.register({
      ttl: 5, // seconds
      max: 100, // maximum number of items in cache
      isGlobal: true,
    }),
    WebSocketModule,

    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 2000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
    ]),
    // https://docs.nestjs.com/security/rate-limiting
  ],
  controllers: [
    AppController,
    UserController,
    TestCacheController,
    FilesController,
    ThrottleController,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    AppService,
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    ScheduleService,
  ],
})
export class AppModule {}
