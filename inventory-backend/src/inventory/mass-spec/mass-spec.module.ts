import { EmailModule } from './../email/email.module';
import { MassSpecRepository } from './mass-spec.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MassSpecController } from './mass-spec.controller';
import { MassSpecService } from './mass-spec.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MassSpecRepository]),
    EmailModule
  ],
  controllers: [MassSpecController],
  providers: [MassSpecService]
})
export class MassSpecModule {}
