import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateStoreRoomDto } from './create-store-room.dto';
import { StoreRoom } from './store-room.entity';
import { StoreRoomService } from './store-room.service';

@Controller('store-room')
export class StoreRoomController {
    constructor(private storeRoomService:StoreRoomService) {}
    @Get()
    getAllStoreRoom(): Promise<StoreRoom[]> {
        return this.storeRoomService.storeRoomItems();
    }
    @Get('/email')
    sendEmailReport(): void {
        this.storeRoomService.scheduledStoreRoomItems()
    }
    @Get('/master')
    getAllStoreRoomMaster(): Promise<StoreRoom[]> {
        return this.storeRoomService.storeRoomMasterItems()
    }
    @Get('/master/:id')
    getSingleStoreRoomMaster(@Param('id', ParseIntPipe) id: number): Promise<StoreRoom> {
        return this.storeRoomService.storeRoomMasterItem(id);
    }

    @Get('/:id')
    getSingleStoreRoom(@Param('id', ParseIntPipe) id: number): Promise<StoreRoom> {
        return this.storeRoomService.storeRoomItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createStoreRoom(@Body() createStoreRoomDto: CreateStoreRoomDto): Promise<StoreRoom> {
        return this.storeRoomService.createStoreRoomItem(createStoreRoomDto)
    }
    @Delete('/:id')
    deleteStoreRoom(@Param('id', ParseIntPipe) id: number): void {
        this.storeRoomService.deleteStoreRoomItem(id);
    }
    @Patch('/:id')
    updateStoreRoom(@Param('id', ParseIntPipe) id: number, @Body() createStoreRoomDto: CreateStoreRoomDto): Promise<StoreRoom> {
        return this.storeRoomService.updateStoreRoomItem(id, createStoreRoomDto)
    }
    @Patch('/deactivate/:id')
    deactivate(@Param('id', ParseIntPipe) id: number, @Body() createStoreRoomDto: CreateStoreRoomDto): Promise<StoreRoom> {
        return this.storeRoomService.deactivateItem(id, createStoreRoomDto)
    }
}
