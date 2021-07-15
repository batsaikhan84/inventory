import { IMaster } from './master.model';
import { IStoreRoom } from './store-room.model';
export interface ISpecialRequest {
    ID: number;
    Item_ID?: number | undefined;
    Item?: string;
    Quantity: number;
    Is_Store_Room_Item?: boolean;
    Location?: string;
    User: string;
    Recent_CN?: string;
    Department: string;
    Status?: string;
    Time_Requested?: string;
    Time_Updated?: string;
    Is_Confirmed?: boolean;
    Is_Special_Request?: boolean;
    storeRoom?: IStoreRoom;
    master?: IMaster;
}