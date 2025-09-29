import { Module } from '@nestjs/common';
import { BookingCountController } from './booking-count/booking-count.controller';
import { BookingCountService } from './booking-count/booking-count.service';
import { FactorService } from './factor/factor.service';
import { FactorController } from './factor/factor.controller';

@Module({
  controllers: [BookingCountController, FactorController],
  providers: [BookingCountService, FactorService]
})
export class OpModule {}
