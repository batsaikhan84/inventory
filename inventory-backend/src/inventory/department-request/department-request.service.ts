import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DepartmentRequestRepository } from "./department-request.repository";
import { DepartmentRequest } from "./department-request.entity";
import { CreateDepartmentRequestDto } from "./create-department-request.dto";

@Injectable()
export class DepartmentRequestService {
  constructor(
    @InjectRepository(DepartmentRequestRepository)
    private departmentRequestRepository: DepartmentRequestRepository,
  ) { }
  public async items(): Promise<DepartmentRequest[]> {
    const itemsRes = await this.departmentRequestRepository.find({ relations: ['storeRoom'] });
    if (!itemsRes) {
      throw new NotFoundException();
    };
    return itemsRes;
  };
  public async item(id: number): Promise<DepartmentRequest> {
    const itemRes = await this.departmentRequestRepository.findOne(id, { relations: ['storeRoom'] });
    if (!itemRes) {
      throw new NotFoundException();
    };
    return itemRes;
  }
  public async deactivateItem(id: number, createDepartmentRequestDto: CreateDepartmentRequestDto): Promise<DepartmentRequest> {
    const itemRes = await this.item(id)
    itemRes.Is_Active = createDepartmentRequestDto.Is_Active
    await itemRes.save()
    return itemRes
  }
};