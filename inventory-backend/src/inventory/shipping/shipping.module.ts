import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '../email/email.module';
import { MasterRepository } from '../master/master.repository';
import { ShippingController } from './shipping.controller';
import { ShippingRepository } from './shipping.repository';
import { ShippingService } from './shipping.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShippingRepository, MasterRepository]),
    EmailModule
  ],
  controllers: [ShippingController],
  providers: [ShippingService]
})
export class ShippingModule {}
