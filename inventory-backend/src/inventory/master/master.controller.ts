import { Rd } from './../rd/rd.entity';
import { Quality } from './../quality/quality.entity';
import { StoreRoom } from './../store-room/store-room.entity';
import { Screening } from './../screening/screening.entity';
import { Receiving } from './../receiving/receving.entity';
import { MassSpec } from './../mass-spec/mass-spec.entity';
import { CreateMasterDto } from './create-master.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { Master } from "./master.entity";
import { MasterService } from "./master.service";
import { Extraction } from '../extraction/extraction.entity';
import { Departments } from '../model/departments.model';

@Controller('master')
export class MasterController {
    constructor(private masterService: MasterService) {}
    @Get()
    getAllMaster(): Promise<Master[]> {
        return this.masterService.masterItems();
    };
    @Get('/chemical')
    getMasterChemical(): Promise<Master[]> {
        return this.masterService.masterChemicalItems()
    }
    @Get('/:id')
    getSingleMaster(@Param('id', ParseIntPipe) id: number): Promise<Master> {
        return this.masterService.masterItem(id)
    }
    @Get('/:id/extraction')
    getMasterExtraction(@Param('id', ParseIntPipe) id: number): Promise<Extraction[]> {
        return this.masterService.masterExtractionItems(id)
    }
    @Get('/:id/mass-spec')
    getMasterMassSpec(@Param('id', ParseIntPipe) id: number): Promise<MassSpec[]> {
        return this.masterService.masterMassSpecItems(id)
    }
    @Get('/:id/receiving')
    getMasterReceiving(@Param('id', ParseIntPipe) id: number): Promise<Receiving[]> {
        return this.masterService.masterReceivingItems(id)
    }
    @Get('/:id/screening')
    getMasterScreening(@Param('id', ParseIntPipe) id: number): Promise<Screening[]> {
        return this.masterService.masterScreeningItems(id)
    }
    @Get('/:id/quality')
    getMasterQuality(@Param('id', ParseIntPipe) id: number): Promise<Quality[]> {
        return this.masterService.masterQualityItems(id)
    }
    @Get('/:id/store-room')
    getMasterStoreRoom(@Param('id', ParseIntPipe) id: number): Promise<StoreRoom[]> {
        return this.masterService.masterStoreRoomItems(id)
    }
    @Get('/:id/rd')
    getMasterRd(@Param('id', ParseIntPipe) id: number): Promise<Rd[]> {
        return this.masterService.masterRdItems(id)
    }
    @Post()
    createMater(@Body('masterItem') masterItem: CreateMasterDto, @Body('departments') departments: Departments): Promise<Master> {
        return this.masterService.createMasterItem(masterItem, departments)
    }
    @Patch('/:id')
    updateMaster(
        @Param('id', ParseIntPipe) id: number,
        @Body('masterItem') masterItem: CreateMasterDto,
        @Body('department') department: string,
    ): Promise<Master> {
        return this.masterService.updateMasterItem(id, masterItem, department)
    }
    @Patch('/deactivate/:id')
    deactivate(@Param('id', ParseIntPipe) id: number, @Body() createMasterDto: CreateMasterDto): Promise<Master> {
        return this.masterService.deactivateItem(id, createMasterDto)
    }
};