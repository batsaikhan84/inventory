import { ScreeningRepository } from './../screening/screening.repository';
import { RdRepository } from './../rd/rd.repository';
import { ExtractionRepository } from './../extraction/extraction.repository';
import { MassSpecRepository } from './../mass-spec/mass-spec.repository';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MasterController } from "./master.controller";
import { MasterRepository } from "./master.repository";
import { MasterService } from "./master.service";
import { ReceivingRepository } from '../receiving/receiving.repository';
import { ChemicalRepository } from '../chemical/chemical.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([MasterRepository, 
                                    MassSpecRepository, 
                                    ExtractionRepository, 
                                    RdRepository, 
                                    ReceivingRepository, 
                                    ScreeningRepository,
                                    ChemicalRepository])
    ],
    providers: [MasterService],
    controllers: [MasterController]
})
export class MasterModule {}