import { EntityRepository, Repository } from "typeorm";
import { Audit } from "./audit.entity";
import { CreateAuditDto } from "./create-audit.dto";

@EntityRepository(Audit)
export class AuditRepository extends Repository<Audit> {
    async createAuditItem(createAuditDto: CreateAuditDto): Promise<Audit> {
        const { ID, Old_Quantity, New_Quantity, Time_Updated, Item_ID, Department, Department_Item_ID, User } = createAuditDto
        const auditItem = new Audit()
        auditItem.ID = ID,
        auditItem.Item_ID = Item_ID,
        auditItem.New_Quantity = New_Quantity,
        auditItem.Old_Quantity = Old_Quantity,
        auditItem.Time_Updated = new Date(Date.now()),
        auditItem.User = User,
        auditItem.Department = Department,
        auditItem.Department_Item_ID = Department_Item_ID
        await auditItem.save()
        return auditItem
    }
}