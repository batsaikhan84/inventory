import { EmailModule } from './../email/email.module';
import { RdRepository } from './rd.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RdService } from './rd.service';
import { RdController } from './rd.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RdRepository]),
    EmailModule
  ],
  controllers: [RdController],
  providers: [RdService]
})
export class RdModule {}
