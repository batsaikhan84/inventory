import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '../email/email.module';
import { MasterRepository } from '../master/master.repository';
import { ExtractionController } from './extraction.controller';
import { ExtractionRepository } from './extraction.repository';
import { ExtractionService } from './extraction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExtractionRepository, MasterRepository]),
    EmailModule
  ],
  controllers: [ExtractionController],
  providers: [ExtractionService]
})
export class ExtractionModule {}
