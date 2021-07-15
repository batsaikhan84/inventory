import { StoreRoom } from './../store-room/store-room.entity';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Master } from '../master/master.entity';

@Entity({ name: 'department_request' })
export class DepartmentRequest extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'id', type: 'int'})
    ID: number;
    @Column({ name: 'item_id', type: 'varchar', nullable: true})
    Item_ID: string;
    @Column({name: 'is_active', type: 'boolean', nullable: true})
    Is_Active: boolean;
    @ManyToOne(type => Master, master => master.departmentRequest, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'item_id' })
    master: Master
    @OneToMany(type => DepartmentRequest, departmentRequest => departmentRequest.storeRoom, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    storeRoom: StoreRoom[];
}