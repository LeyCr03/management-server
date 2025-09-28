import { Sex, Status } from 'src/types';
import { Payment } from './payment.entity';
import { Entry } from './entry.entity';
export declare class Account {
    id: string;
    birth: Date;
    registered_at: Date;
    age: number;
    name: string;
    sex: Sex;
    status: Status;
    payments: Payment[];
    entries: Entry[];
}
