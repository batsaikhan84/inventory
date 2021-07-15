import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '../email/email.module';
import { MasterRepository } from '../master/master.repository';
import { SpecialRequestController } from './special-request.controller';
import { SpecialRequestService } from './special-request.service';
import { SpecialRequestRepository } from './special.request.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpecialRequestRepository, MasterRepository]),
    EmailModule

  ],
  controllers: [SpecialRequestController],
  providers: [SpecialRequestService]
})
export class SpecialRequestModule {}
