import { EmailModule } from './../email/email.module';
import { ReceivingRepository } from './receiving.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceivingController } from './receiving.controller';
import { ReceivingService } from './receiving.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReceivingRepository]),
    AuthModule,
    EmailModule
  ],
  controllers: [ReceivingController],
  providers: [ReceivingService]
})
export class ReceivingModule {}
