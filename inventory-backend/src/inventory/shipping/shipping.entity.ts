import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Master } from '../master/master.entity';

@Entity({ name: 'shipping' })
export class Shipping extends BaseEntity {
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
    @Column({name: 'is_need_to_order', type: 'boolean', nullable: true})
    Is_Need_To_Order: boolean
    @Column({name: 'order_quantity', type: 'int', nullable: true})
    Order_Quantity: number
    @ManyToOne(type => Master, master => master.shipping, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'item_id' })
    master: Master
}