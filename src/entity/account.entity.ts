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

    @Column({ type: 'date' }) // Use 'date' type for birthdates, not timestamp
    birth: Date;

    @CreateDateColumn({ type: 'timestamp' })
    registered_at: Date;

    @Column({ type: 'int' }) // Use 'int' type for age
    age: number;

    @Column({ type: 'varchar', length: 255 }) // Specify length for varchar
    name: string;

    @Column({ type: 'enum', enum: Sex }) // Specify the enum type
    sex: Sex;

    @Column({ type: 'enum', enum: Status, default: Status.SUSPENDED}) // Specify the enum type
    status: Status;

    @OneToMany(() => Payment, (payment) => payment.account)
    payments: Payment[];

    @OneToMany(() => Entry, (entry) => entry.account)
    entries: Entry[];
}