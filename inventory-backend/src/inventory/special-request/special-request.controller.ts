import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateSpecialRequestDto } from './create-special-request.dto';
import { SpecialRequest } from './special-request.entity';
import { SpecialRequestService } from './special-request.service';

@Controller('special-request')
export class SpecialRequestController {
    constructor(private specialRequestService: SpecialRequestService) {}
    @Get()
    getAllSpecialRequest(): Promise<SpecialRequest[]> {
        return this.specialRequestService.specialRequestItems();
    }
    @Get('/:id')
    getSingleSpecialRequest(@Param('id', ParseIntPipe) id: number): Promise<SpecialRequest> {
        return this.specialRequestService.specialRequestItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createSpecialRequest(@Body() createSpecialRequestDto: CreateSpecialRequestDto): Promise<SpecialRequest> {
        return this.specialRequestService.createSpecialRequestItem(createSpecialRequestDto)
    }
    @Delete('/:id')
    deleteSpecialRequest(@Param('id', ParseIntPipe) id: number): void {
        this.specialRequestService.deleteSpecialRequestItem(id);
    }
    @Patch('/:id')
    updateSpecialRequest(@Param('id', ParseIntPipe) id: number, @Body() createSpecialRequestDto: CreateSpecialRequestDto): Promise<SpecialRequest> {
        return this.specialRequestService.updateSpecialRequestItem(id, createSpecialRequestDto)
    }

}
