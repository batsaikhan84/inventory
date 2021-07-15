export class CreateSpecialRequestDto {
    ID: number;
    Item_ID: number;
    Quantity: number;
    Department: string;
    Recent_CN: string;
    Location: string;
    Status: string;
    Time_Requested: Date;
    Time_Updated: Date;
    Is_Special_Request: boolean;
    Is_Confirmed: boolean;
    Is_Store_Room_Item: boolean;
    Comment: string;
    User: string;
}

