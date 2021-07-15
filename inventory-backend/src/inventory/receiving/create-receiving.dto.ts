export class CreateReceivingDto {
    ID: number;
    Item_ID: number;
    Location: string;
    Quantity: number;
    Min_Quantity: number;
    Max_Quantity: number;
    Usage_Level: string;
    Is_Need_To_Order?: boolean;
    Order_Quantity?: number;
}