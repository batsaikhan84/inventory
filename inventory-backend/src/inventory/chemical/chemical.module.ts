import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChemicalController } from './chemical.controller';
import { ChemicalRepository } from './chemical.repository';
import { ChemicalService } from './chemical.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ChemicalRepository])
    ],
    providers: [ChemicalService],
    controllers: [ChemicalController]
})
export class ChemicalModule {}