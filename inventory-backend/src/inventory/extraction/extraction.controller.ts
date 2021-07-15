import { CreateExtractionDto } from './create-extraction.dto';
import { Body, Param, Post, ValidationPipe, Patch, Delete, ParseIntPipe,Controller, Get, UsePipes } from '@nestjs/common';
import { Extraction } from './extraction.entity';
import { ExtractionService } from './extraction.service';

@Controller('extraction')
export class ExtractionController {
    constructor(private extractionService: ExtractionService) {}
    @Get()
    getAllExtraction(): Promise<Extraction[]> {
        return this.extractionService.extractionItems();
    }
    @Get('/email')
    sendEmailReport(): void {
        this.extractionService.scheduledExtractionItems()
    }
    @Get('/master')
    getAllExtractionTotal(): Promise<Extraction[]> {
        return this.extractionService.extractionMasterItems();
    }
    @Get('/master/:id')
    getSingleExtractionMaster(@Param('id', ParseIntPipe) id: number): Promise<Extraction> {
        return this.extractionService.extractionMasterItem(id);
    }
    @Get('/:id')
    getSingleExtraction(@Param('id', ParseIntPipe) id: number): Promise<Extraction> {
        return this.extractionService.extractionItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createExtraction(@Body() createExtractionDto: CreateExtractionDto): Promise<Extraction> {
        return this.extractionService.createExtractionItem(createExtractionDto)
    }
    @Delete('/:id')
    deleteExtraction(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.extractionService.deleteItem(id);
    }
    @Patch('/:id')
    updateExtraction(@Param('id', ParseIntPipe) id: number, @Body() createExtractionDto: CreateExtractionDto): Promise<Extraction> {
        return this.extractionService.updateExtractionItem(id, createExtractionDto)
    }
}
