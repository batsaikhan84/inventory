import { Extraction } from "../extraction/extraction.entity";
import { MassSpec } from "../mass-spec/mass-spec.entity";
import { Rd } from "../rd/rd.entity";
import { Receiving } from "../receiving/receving.entity";
import { Screening } from "../screening/screening.entity";

export class CreateMasterDto {
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
    extraction: Extraction[];
    massSpec: MassSpec[];
    receiving: Receiving[];
    rd: Rd[];
    screening: Screening[];
}