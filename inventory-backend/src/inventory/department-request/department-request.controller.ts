import { Body, Controller, Get, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { CreateDepartmentRequestDto } from './create-department-request.dto';
import { DepartmentRequestService } from './department-request.service';
import { DepartmentRequest } from './department-request.entity';

@Controller('department-request')
export class DepartmentRequestController {
    constructor(private departmentRequestService: DepartmentRequestService) {}
    @Get()
    getItems(): Promise<DepartmentRequest[]> {
        return this.departmentRequestService.items();
    };
    @Patch('/deactivate/:id')
    deactivate(@Param('id', ParseIntPipe) id: number, @Body() createDepartmentRequestDto: CreateDepartmentRequestDto): Promise<DepartmentRequest> {
        return this.departmentRequestService.deactivateItem(id, createDepartmentRequestDto)
    }
};