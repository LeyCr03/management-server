import { Account } from "./account.entity";
export declare class Payment {
    id: string;
    registered_at: Date;
    accountId: string;
    account: Account;
}
