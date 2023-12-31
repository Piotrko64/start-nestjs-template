import { Controller, Get, Ip } from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@SkipThrottle({ short: true, medium: true })
@Controller('throttle')
export class ThrottleController {
  @Get('/without')
  doSkip() {
    return 'work without Rate limiting ;)';
  }

  @SkipThrottle({ short: false, medium: false })
  @Get('/work')
  dontSkip(@Ip() ip: string) {
    return 'work with Rate limiting! For IP: ' + ip;
  }

  @SkipThrottle({ short: false, medium: false })
  @Throttle({ short: { limit: 1, ttl: 3000 } })
  @Get()
  findAll() {
    return 'Okey - I working';
  }
}
