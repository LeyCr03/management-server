import { Account } from "./account.entity";
export declare class Entry {
    id: string;
    registered_at: Date;
    accountId: string;
    account: Account;
}
