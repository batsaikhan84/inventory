import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Audit } from './audit.entity';
import { AuditService } from './audit.service';
import { CreateAuditDto } from './create-audit.dto';

@Controller('audit')
export class AuditController {
    constructor(private auditService: AuditService) { }
    @Post()
    createAudit(@Body() createAuditDto: CreateAuditDto): Promise<Audit> {
        return this.auditService.createAuditItem(createAuditDto)
    }
}
