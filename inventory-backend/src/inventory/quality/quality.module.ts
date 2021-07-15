import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '../email/email.module';
import { QualityController } from './quality.controller';
import { QualityRepository } from './quality.repository';
import { QualityService } from './quality.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QualityRepository]),
    EmailModule
  ],
  controllers: [QualityController],
  providers: [QualityService]
})
export class QualityModule {}
