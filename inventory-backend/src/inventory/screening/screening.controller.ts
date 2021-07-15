import { Body, Param, Post, ValidationPipe, Patch, Delete, ParseIntPipe, Controller, Get, UsePipes } from '@nestjs/common';
import { CreateScreeningDto } from './create-screening.dto';
import { Screening } from './screening.entity';
import { ScreeningService } from './screening.service';

@Controller('screening')
export class ScreeningController {
    constructor(private screeningService: ScreeningService) {}
    @Get()
    getAllScreening(): Promise<Screening[]> {
        return this.screeningService.screeningItems();
    }
    @Get('/email')
    sendEmailReport(): void {
        this.screeningService.scheduledScreeningItems()
    }
    @Get('/master')
    getAllScreeningMaster(): Promise<Screening[]> {
        return this.screeningService.screeningMasterItems();
    }
    @Get('/master/:id')
    getSingleScreeningMaster(@Param('id', ParseIntPipe) id: number): Promise<Screening> {
        return this.screeningService.screeningMasterItem(id);
    }
    @Get('/:id')
    getSingleScreening(@Param('id', ParseIntPipe) id: number): Promise<Screening> {
        return this.screeningService.screeningItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createScreening(@Body() createScreeningDto: CreateScreeningDto): Promise<Screening> {
        return this.screeningService.createScreeningItem(createScreeningDto)
    }
    @Delete('/:id')
    deleteScreening(@Param('id', ParseIntPipe) id: number): void {
        this.screeningService.deleteItem(id);
    }
    @Patch('/:id')
    updateScreening(@Param('id', ParseIntPipe) id: number, @Body() createScreeningDto: CreateScreeningDto): Promise<Screening> {
        return this.screeningService.updateScreeningItem(id, createScreeningDto)
    }
}
