import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Audit } from './audit.entity';
import { AuditRepository } from './audit.repository';
import { CreateAuditDto } from './create-audit.dto';

@Injectable()
export class AuditService {
    constructor(
        @InjectRepository(Audit)
        private AuditRepository: AuditRepository
    ) { }
    createAuditItem(createAuditDto: CreateAuditDto): Promise<Audit> {
        return this.AuditRepository.createAuditItem(createAuditDto)
    }

}
