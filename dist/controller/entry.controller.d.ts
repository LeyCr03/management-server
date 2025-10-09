import { EntryService } from "src/service/entry.service";
export declare class EntriesController {
    private readonly entryService;
    constructor(entryService: EntryService);
    delete(id: string): Promise<{
        message: string;
    }>;
    create(id: string): Promise<import("../entity/entry.entity").Entry>;
    getEntries(): Promise<number>;
    getMonthlyEntries(): Promise<{
        date: Date;
        entries: number;
    }[]>;
    geAllEntries(): Promise<import("../entity/entry.entity").Entry[]>;
}
