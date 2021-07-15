import { Body, Param, Post, ValidationPipe, Patch, Delete, ParseIntPipe,Controller, Get, UsePipes } from '@nestjs/common';
import { CreateShippingDto } from './create-shipping.dto';
import { Shipping } from './shipping.entity';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
    constructor(private shippingService: ShippingService) {}
    @Get()
    getAllExtraction(): Promise<Shipping[]> {
        return this.shippingService.shippingItems();
    }
    @Get('/email')
    sendEmailReport(): void {
        this.shippingService.scheduledItems()
    }
    @Get('/master')
    getAllExtractionTotal(): Promise<Shipping[]> {
        return this.shippingService.shippingMasterItems();
    }
    @Get('/master/:id')
    getSingleExtractionMaster(@Param('id', ParseIntPipe) id: number): Promise<Shipping> {
        return this.shippingService.shippingMasterItem(id);
    }
    @Get('/:id')
    getSingleExtraction(@Param('id', ParseIntPipe) id: number): Promise<Shipping> {
        return this.shippingService.shippingItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createExtraction(@Body() createExtractionDto: CreateShippingDto): Promise<Shipping> {
        return this.shippingService.createShippingItem(createExtractionDto)
    }
    @Delete('/:id')
    deleteExtraction(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.shippingService.deleteItem(id);
    }
    @Patch('/:id')
    updateExtraction(@Param('id', ParseIntPipe) id: number, @Body() createExtractionDto: CreateShippingDto): Promise<Shipping> {
        return this.shippingService.updateShippingItem(id, createExtractionDto)
    }
}
