import { EntityRepository, Repository } from "typeorm";
import { CreateSpecialRequestDto } from "./create-special-request.dto";
import { SpecialRequest } from "./special-request.entity";

@EntityRepository(SpecialRequest)
export class SpecialRequestRepository extends Repository<SpecialRequest> {
     async createSpecialRequestItem(createSpecialRequestDto: CreateSpecialRequestDto) {
        const { Item_ID, Quantity, Department, User} = createSpecialRequestDto
        const specialRequestItem = new SpecialRequest();
        specialRequestItem.Item_ID = Item_ID;
        specialRequestItem.Quantity = Quantity;
        specialRequestItem.Department = Department;
        specialRequestItem.Status = 'Pending';
        specialRequestItem.Time_Updated = null
        specialRequestItem.Is_Confirmed = createSpecialRequestDto.Is_Confirmed;
        specialRequestItem.Is_Store_Room_Item = createSpecialRequestDto.Is_Store_Room_Item;
        specialRequestItem.Location = createSpecialRequestDto.Location
        specialRequestItem.Comment = specialRequestItem.Comment
        specialRequestItem.User = User
        await specialRequestItem.save();
        return specialRequestItem;
    }
}