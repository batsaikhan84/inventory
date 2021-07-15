import { Receiving } from './receving.entity';
import { CreateReceivingDto } from './create-receiving.dto';
import { ReceivingService } from './receiving.service';
import { Body, Param, Post, ValidationPipe, Patch, Delete, ParseIntPipe, Controller, Get, UsePipes, UseGuards } from '@nestjs/common';

@Controller('receiving')
export class ReceivingController {
    constructor(private receivingService: ReceivingService) {}
    @Get()
    getAllReceiving(): Promise<Receiving[]> {
        return this.receivingService.receivingItems();
    }
    @Get('/email')
    sendEmailReport(): void {
        this.receivingService.scheduledReceivingItems()
    }
    @Get('/master')
    getAllReceivingMaster(): Promise<Receiving[]> {
        return this.receivingService.receivingMasterItems();
    }
    @Get('/master/:id')
    getSingleReceivingMaster(@Param('id', ParseIntPipe) id: number): Promise<Receiving> {
        return this.receivingService.receivingMasterItem(id);
    }
    @Get('/:id')
    getSingleReceiving(@Param('id', ParseIntPipe) id: number): Promise<Receiving> {
        return this.receivingService.receivingItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createReceiving(@Body() createReceivingDto: CreateReceivingDto): Promise<Receiving> {
        return this.receivingService.createReceivingItem(createReceivingDto)
    }
    @Delete('/:id')
    deleteReceiving(@Param('id', ParseIntPipe) id: number): void {
        this.receivingService.deleteReceivingItem(id);
    }
    @Patch('/:id')
    updateReceiving(@Param('id', ParseIntPipe) id: number, @Body() createReceivingDto: CreateReceivingDto): Promise<Receiving> {
        return this.receivingService.updateReceivingItem(id, createReceivingDto)
    }
}
