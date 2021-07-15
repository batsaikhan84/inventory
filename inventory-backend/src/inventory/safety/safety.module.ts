import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SafetyController } from './safety.controller';
import { SafetyRepository } from './safety.repository';
import { SafetyService } from './safety.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([SafetyRepository])
  ],
  controllers: [SafetyController],
  providers: [SafetyService]
})
export class SafetyModule {}
