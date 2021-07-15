import { Controller, Get, Query } from '@nestjs/common';
import { Chemical } from './chemical.entity';
import { ChemicalService } from './chemical.service';

@Controller('chemical')
export class ChemicalController {
    constructor(private chemicalService: ChemicalService) {}
    @Get()
    getAllMaster(): Promise<Chemical[]> {
        return this.chemicalService.chemicalItems();
    };
    @Get('/paginate')
    getPaginatedChemical(@Query('page') page: number = 1, @Query('limit') limit: number = 5): Promise<Chemical[]> {
        return this.chemicalService.paginate(page, limit);
    }
}
