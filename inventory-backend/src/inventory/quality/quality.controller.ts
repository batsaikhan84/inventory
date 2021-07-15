import { CreateQualityDto } from './create-quality.dto';
import { Quality } from './quality.entity';
import { QualityService } from './quality.service';
import { Body, Param, Post, ValidationPipe, Patch, Delete, ParseIntPipe, Controller, Get, UsePipes } from '@nestjs/common';

@Controller('quality')
export class QualityController {
    constructor(private qualityService: QualityService) {}
    @Get()
    getAllQuality(): Promise<Quality[]> {
        return this.qualityService.qualityItems();
    }
    @Get('/master')
    getAllQualityMater(): Promise<Quality[]> {
        return this.qualityService.qualityMasterItems();
    }
    @Get('/master/:id')
    getSingleExtractionMaster(@Param('id', ParseIntPipe) id: number): Promise<Quality> {
        return this.qualityService.qualityMaterItem(id);
    }
    @Get('/:id')
    getSingleQuality(@Param('id', ParseIntPipe) id: number): Promise<Quality> {
        return this.qualityService.qualityItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createQuality(@Body() createQualityDto: CreateQualityDto): Promise<Quality> {
        return this.qualityService.createQualityItem(createQualityDto)
    }
    @Delete('/:id')
    deleteQuality(@Param('id', ParseIntPipe) id: number): void {
        this.qualityService.deleteQualityItem(id);
    }
    @Patch('/:id')
    updateQuality(@Param('id', ParseIntPipe) id: number, @Body() createQualityDto: CreateQualityDto): Promise<Quality> {
        return this.qualityService.updateQualityItem(id, createQualityDto)
    }
}
