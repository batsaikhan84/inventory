import { RdService } from './rd.service';
import { Body, Param, Post, ValidationPipe, Patch, Delete, ParseIntPipe, Controller, Get, UsePipes } from '@nestjs/common';
import { Rd } from './rd.entity';
import { CreateRdDto } from './create-rd.dto';

@Controller('rd')
export class RdController {
    constructor(private rdService: RdService) {}
    @Get()
    getAllRd(): Promise<Rd[]> {
        return this.rdService.rdItems();
    }
    @Get('/master')
    getAllRdMaster(): Promise<Rd[]> {
        return this.rdService.rdMasterItems();
    }
    @Get('/master/:id')
    getSingleRdMaster(@Param('id', ParseIntPipe) id: number): Promise<Rd> {
        return this.rdService.rdMasterItem(id);
    }
    @Get('/:id')
    getSingleRd(@Param('id', ParseIntPipe) id: number): Promise<Rd> {
        return this.rdService.rdItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createRd(@Body() createRdDto: CreateRdDto): Promise<Rd> {
        return this.rdService.createRdItem(createRdDto)
    }
    @Delete('/:id')
    deleteRd(@Param('id', ParseIntPipe) id: number): void {
        this.rdService.deleteRdItem(id);
    }
    @Patch('/:id')
    updateRd(@Param('id', ParseIntPipe) id: number, @Body() createRdDto: CreateRdDto): Promise<Rd> {
        return this.rdService.updateRdItem(id, createRdDto)
    }
}
