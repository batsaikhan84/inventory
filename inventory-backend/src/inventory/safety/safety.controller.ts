import { Body, Param, Post, ValidationPipe, Patch, Delete, ParseIntPipe, Controller, Get, UsePipes } from '@nestjs/common';
import { CreateSafetyDto } from './create-safety.dto';
import { Safety } from './safety.entity';
import { SafetyService } from './safety.service';

@Controller('safety')
export class SafetyController {
    constructor(private safetyService: SafetyService) {}
    @Get()
    getAllSafety(): Promise<Safety[]> {
        return this.safetyService.safetyItems();
    }
    @Get('/total')
    getAllSafetyTotal(): Promise<Safety[]> {
        return this.safetyService.safetyItemsTotal();
    }
    @Get('/:id')
    getSingleSafety(@Param('id', ParseIntPipe) id: number): Promise<Safety> {
        return this.safetyService.safetyItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createSafety(@Body() createSafetyDto: CreateSafetyDto): Promise<Safety> {
        return this.safetyService.createSafetyItem(createSafetyDto)
    }
    @Delete('/:id')
    deleteSafety(@Param('id', ParseIntPipe) id: number): void {
        this.safetyService.deleteSafetyItem(id);
    }
    @Patch('/:id')
    updateSafety(@Param('id', ParseIntPipe) id: number, @Body() createSafetyDto: CreateSafetyDto): Promise<Safety> {
        return this.safetyService.updateSafetyItem(id, createSafetyDto)
    }
}
