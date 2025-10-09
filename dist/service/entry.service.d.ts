import { Repository } from "typeorm";
import { Account } from "src/entity/account.entity";
import { Entry } from "src/entity/entry.entity";
export declare class EntryService {
    private readonly entryRepository;
    private readonly accountRepository;
    constructor(entryRepository: Repository<Entry>, accountRepository: Repository<Account>);
    createEntry(accountId: string): Promise<Entry>;
    findById(id: string): Promise<Entry | null>;
    deleteEntry(id: string): Promise<{
        message: string;
    }>;
    getAllMonthlyEntries(): Promise<{
        date: Date;
        entries: number;
    }[]>;
    getAllEntriesSinceLastMonths(): Promise<number>;
    getAllEntries(): Promise<Entry[]>;
    getLastEntry(accountId: string): Promise<Date>;
}
