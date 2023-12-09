import { Controller, Get, Inject } from '@nestjs/common';
import { CacheInterceptor, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UseInterceptors } from '@nestjs/common';

@Controller('test-cache')
export class TestCacheController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @UseInterceptors(CacheInterceptor)
  @Get('')
  randomCacheNumber() {
    return Math.random();
  }

  //USE WHEN GLOBAL CACHING IS DISABLED
  @Get('/control')
  async controlCache() {
    console.log(await this.cacheManager.get('key'));
    if (!(await this.cacheManager.get('key'))) {
      await this.cacheManager.set('key', Math.random() + 100, 2);
    }
    return (await this.cacheManager.get('key')) || 'NOTHING';
  }
}
