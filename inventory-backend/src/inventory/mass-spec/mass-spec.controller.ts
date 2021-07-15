import { CreateMassSpecDto } from './create-mass-spec.dto';
import { Body, Param, Post, ValidationPipe, Patch, Delete, ParseIntPipe,Controller, Get, UsePipes } from '@nestjs/common';
import { MassSpecService } from './mass-spec.service';
import { MassSpec } from './mass-spec.entity';

@Controller('mass-spec')
export class MassSpecController {
    constructor(private massSpecService: MassSpecService) {}
    @Get()
    getAllMassSpec(): Promise<MassSpec[]> {
        return this.massSpecService.massSpecItems();
    }
    @Get('/email')
    sendEmailReport(): void {
        this.massSpecService.scheduledMassSpecItems()
    }
    @Get('/master')
    getAllMassSpecTotal(): Promise<MassSpec[]> {
        return this.massSpecService.massSpecMasterItems();
    }
    @Get('/master/:id')
    getSingleExtractionTotal(@Param('id', ParseIntPipe) id: number): Promise<MassSpec> {
        return this.massSpecService.massSpecMasterItem(id);
    }
    @Get('/:id')
    getSingleMassSpec(@Param('id', ParseIntPipe) id: number): Promise<MassSpec> {
        return this.massSpecService.massSpecItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createMassSpec(@Body() createMassSpecDto: CreateMassSpecDto): Promise<MassSpec> {
        return this.massSpecService.createMassSpecItem(createMassSpecDto)
    }
    @Delete('/:id')
    deleteMassSpec(@Param('id', ParseIntPipe) id: number): void {
        this.massSpecService.deleteMassSpecItem(id);
    }
    @Patch('/:id')
    updateMassSpec(@Param('id', ParseIntPipe) id: number, @Body() createMassSpecDto: CreateMassSpecDto): Promise<MassSpec> {
        return this.massSpecService.updateMassSpecItem(id, createMassSpecDto)
    }
}
