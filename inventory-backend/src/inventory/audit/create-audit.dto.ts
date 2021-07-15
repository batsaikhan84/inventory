export class CreateAuditDto {
    ID: number;
    Old_Quantity: number;
    New_Quantity: number;
    Time_Updated: Date;
    Item_ID: number;
    Department: string;
    Department_Item_ID: number;
    User: string;
}