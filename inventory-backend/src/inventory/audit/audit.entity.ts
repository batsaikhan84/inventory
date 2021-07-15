import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcryptjs from 'bcryptjs'

@Entity({name: 'audit'})
export class Audit extends BaseEntity {
    @PrimaryGeneratedColumn()
    ID: number;
    @Column({ name: 'old_quantity', type: 'int', nullable: true})
    Old_Quantity: number;
    @Column({ name: 'new_quantity', type: 'int', nullable: true})
    New_Quantity: number;
    @Column({ name: 'time_updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true})
    Time_Updated: Date;
    @Column({ name: 'item_id', type: 'int', nullable: true})
    Item_ID: number;
    @Column({ name: 'user', type: 'varchar', nullable: true})
    User: string;
    @Column({ name: 'department_item_id', type: 'int', nullable: true})
    Department_Item_ID: number;
    @Column({ name: 'department', type: 'varchar', nullable: true})
    Department: string;
}