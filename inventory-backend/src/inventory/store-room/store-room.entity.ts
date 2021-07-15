import { Master } from './../master/master.entity';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { DepartmentRequest } from '../department-request/department-request.entity';

@Entity({ name: 'store_room' })
export class StoreRoom extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    ID: number;
    @Column({ name: 'item_id', type: 'int', nullable: true })
    Item_ID: number;
    @Column({ name: 'location', type: 'varchar', nullable: true })
    Location: string;
    @Column({ name: 'quantity', type: 'int', nullable: true })
    Quantity: number;
    @Column({ name: 'min_quantity', type: 'int', nullable: true })
    Min_Quantity: number;
    @Column({ name: 'max_quantity', type: 'int', nullable: true })
    Max_Quantity: number;
    @Column({ name: 'usage_level', type: 'varchar', nullable: true })
    Usage_Level: string;
    @Column({ name: 'issued', type: 'int', nullable: true })
    Issued: number;
    @Column({ name: 'received', type: 'int', nullable: true })
    Received: number;
    @Column({name: 'is_need_to_order', type: 'boolean', nullable: true})
    Is_Need_To_Order: boolean
    @Column({name: 'order_quantity', type: 'int', nullable: true})
    Order_Quantity: number
    @Column({name: 'is_active', type: 'boolean', nullable: false })
    Is_Active: boolean
    @ManyToOne(type => Master, master => master.extraction, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'item_id' })
    master: Master
    // @ManyToOne(type => DepartmentRequest, departmentRequest => departmentRequest.storeRoom, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    // @JoinColumn({ name: 'item_id' })
    // departmentRequest: DepartmentRequest
}