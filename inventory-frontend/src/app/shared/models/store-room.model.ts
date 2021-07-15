export interface IStoreRoom {
    Item: any;
    ID: number;
    Item_ID: number;
    Location: string;
    Quantity: number;
    Min_Quantity: number;
    Max_Quantity: number;
    Usage_Level: string;
    Issued: number;
    Received: number;
    Is_Special_Request: boolean;
    Is_Active: boolean;
}