import { Validate } from "class-validator";
import { Unique } from "typeorm";
import { StoreRoom } from "./store-room.entity";

export class CreateStoreRoomDto {
    ID: number;
    @Validate(Unique, [StoreRoom])
    Item_ID: number;
    Location: string;
    Quantity: number;
    Min_Quantity: number;
    Max_Quantity: number;
    Usage_Level: string;
    Issued: number;
    Received: number;
    Is_Need_To_Order: boolean;
    Order_Quantity: number;
    Is_Active: boolean;
}