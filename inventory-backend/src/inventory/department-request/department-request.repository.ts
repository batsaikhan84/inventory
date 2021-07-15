import { Rd } from './../rd/rd.entity';
import { EntityRepository, Repository } from "typeorm";
import { Extraction } from "../extraction/extraction.entity";
import { MassSpec } from "../mass-spec/mass-spec.entity";
import { Departments } from "../model/departments.model";
import { Quality } from "../quality/quality.entity";
import { Receiving } from "../receiving/receving.entity";
import { Screening } from "../screening/screening.entity";
import { StoreRoom } from "../store-room/store-room.entity";
import { CreateChemicalDto } from '../chemical/create-chemical-dto';
import { CreateDepartmentRequestDto } from './create-department-request.dto';
import { DepartmentRequest } from './department-request.entity';

@EntityRepository(DepartmentRequest)
export class DepartmentRequestRepository extends Repository<DepartmentRequest> {

}