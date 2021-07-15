import { EmailModule } from './../email/email.module';
import { ScreeningService } from './screening.service';
import { ScreeningController } from './screening.controller';
import { ScreeningRepository } from './screening.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([ScreeningRepository]),
    EmailModule
  ],
  controllers: [ScreeningController],
  providers: [ScreeningService]
})
export class ScreeningModule {}
