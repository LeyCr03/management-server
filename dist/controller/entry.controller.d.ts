import { EntryService } from "src/service/entry.service";
export declare class EntriesController {
    private readonly entryService;
    constructor(entryService: EntryService);
    delete(id: string): Promise<{
        message: string;
    }>;
    create(id: string, registered_at: Date): Promise<import("../entity/entry.entity").Entry>;
    getEntryById(id: string): Promise<import("../entity/entry.entity").Entry | null>;
    getEntriesByDate(date: Date): Promise<import("../entity/entry.entity").Entry[]>;
    getAccountEntries(id: string): Promise<import("../entity/entry.entity").Entry[]>;
    getMonthlyEntries(): Promise<import("../entity/entry.entity").Entry[]>;
}
