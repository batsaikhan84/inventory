import { ScreeningRepository } from './../screening/screening.repository';
import { RdRepository } from './../rd/rd.repository';
import { ExtractionRepository } from './../extraction/extraction.repository';
import { MassSpecRepository } from './../mass-spec/mass-spec.repository';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReceivingRepository } from '../receiving/receiving.repository';
import { ChemicalRepository } from '../chemical/chemical.repository';
import { DepartmentRequestRepository } from './department-request.repository';
import { DepartmentRequestService } from './department-request.service';
import { DepartmentRequestController } from './department-request.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([DepartmentRequestRepository,
      MassSpecRepository,
      ExtractionRepository,
      RdRepository,
      ReceivingRepository,
      ScreeningRepository,
      ChemicalRepository])
  ],
  providers: [DepartmentRequestService],
  controllers: [DepartmentRequestController]
})
export class DepartmentRequestModule { }