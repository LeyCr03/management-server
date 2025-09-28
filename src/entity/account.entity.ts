import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { Sex, Status } from 'src/types';
import { Payment } from './payment.entity';
import { Entry } from './entry.entity';

@Entity({ name: 'account' })
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamp' })
    birth: Date

    @CreateDateColumn({ type: 'timestamp' })
    registered_at: Date

    @Column({ type: 'number' })
    age: number

    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'enum' })
    sex: Sex

    @Column({ type: 'enum' })
    status: Status

    @Column({ type: 'text', nullable: true })
    refreshTokenHash?: string | null;

    @OneToMany(() => Payment, (payment) => payment.account)
    payments: Payment[];

    @OneToMany(() => Entry, (entry) => entry.account)
    entries: Entry[];
}