import { IStoreRoom } from "src/app/shared/models/store-room.model";

export interface IDepartmentRequest{
  ID: number;
  Item: string;
  Purchase_Unit: string;
  Manufacturer: string;
  Part_Number: string;
  Recent_CN: string;
  Recent_Vendor: string;
  Fisher_CN: string;
  VWR_CN: string;
  Lab_Source_CN: string;
  Next_Advance_CN: string;
  Average_Unit_Price: string;
  Category: string;
  Comments: string;
  Type: string;
  Class: string;
  Is_Active: boolean;
  storeRoom: IStoreRoom[];

}