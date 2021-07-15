import { IChemical } from './chemical.model';
import { IQuality } from 'src/app/shared/models/quality.model';
import { IReceiving } from './receiving.model';
import { IMassSpec } from './mass-spec.model';
import { IExtraction } from 'src/app/shared/models/extraction.model';
import { IScreening } from './screening.model';
import { IRd } from './rd.model';
import { IStoreRoom } from './store-room.model';
export interface IMaster{
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
    Is_Special_Request: boolean;
    extraction: IExtraction[];
    massSpec: IMassSpec[];
    receiving: IReceiving[];
    screening: IScreening[];
    quality: IQuality[];
    rd: IRd[];
    chemical: IChemical[];
    storeRoom: IStoreRoom[];

}