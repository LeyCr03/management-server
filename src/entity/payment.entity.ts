import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne } from "typeorm";
import { Account } from "./account.entity";

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn( { type: 'timestamp'})
    registered_at: Date

    @Column({ type: 'uuid' })
    accountId: string

    @ManyToOne(() => Account, account => account.payments )
    account: Account;
}