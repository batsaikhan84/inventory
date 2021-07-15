import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Master } from '../master/master.entity';

@Entity({ name: 'special_request' })
export class SpecialRequest extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    ID: number;
    @Column({ name: 'item_id', type: 'int', nullable: true })
    Item_ID: number;
    @Column({ name: 'quantity', type: 'int', nullable: true })
    Quantity: number;
    @Column({ name: 'department', type: 'varchar', nullable: true })
    Department: string;
    @Column({ name: 'status', type: 'varchar', nullable: true })
    Status: string;
    @Column({ name: 'location', type: 'varchar', nullable: true })
    Location: string;
    @Column({ name: 'time_requested', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true})
    Time_Requested: Date;
    @Column({ name: 'time_updated', type: 'datetime', nullable: true })
    Time_Updated: Date;
    @Column({ name: 'is_confirmed', type: 'boolean', nullable: true })
    Is_Confirmed: boolean;
    @Column({ name: 'is_store_room_item', type: 'boolean', nullable: true })
    Is_Store_Room_Item: boolean;
    @Column({ name: 'user', type: 'varchar', nullable: true })
    User: string;
    @Column({ name: 'comment', type: 'varchar', nullable: true })
    Comment: string;
    @ManyToOne(type => Master, master => master.specialRequest, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'item_id' })
    master: Master
}