import { IMaster } from "./master.model";

export interface IQuality {
    ID: number;
    Item_ID: number;
    Location: string;
    Quantity: number;
    Min_Quantity: number;
    Max_Quantity: number;
    Usage_Level: string;
    master: IMaster
}