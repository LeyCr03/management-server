import { InjectRepository } from "@nestjs/typeorm";
import { Between, MoreThanOrEqual, Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Account } from "src/entity/account.entity";
import { Entry } from "src/entity/entry.entity";
import { AccountService } from "./account.service";

@Injectable()
export class EntryService {
    constructor(
        @InjectRepository(Entry)
        private readonly entryRepository: Repository<Entry>,
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,

    ) { }


    async createEntry(accountId: string): Promise<Entry> {
        const account = await this.accountRepository.findOne({ where: { id: accountId } })
        if (!account) {
            throw new NotFoundException('Account not found')
        }
        const entry = await this.entryRepository.create(
            {
                accountId,
                account
            }
        );
        const savedEntry = await this.entryRepository.save(entry);

        return savedEntry;
    }

    async findById(id: string): Promise<Entry | null> { // Find Entry by id
        return this.entryRepository.findOne({ where: { id } });
    }

    async deleteEntry(id: string): Promise<{ message: string }> { //delete function
        const entry = await this.entryRepository.findOne({ where: { id } });

        if (!entry) {
            throw new NotFoundException('Entry with ID ${id} not found.');
        }

        await this.entryRepository.remove(entry);
        return { message: 'Entry deleted Succsessfully' };
    }

    // Find all entries since last month
    async getAllMonthlyEntries(): Promise<{ date: Date; entries: number }[]> {
        const currentDate = new Date();
        const lastMonthDate = new Date(currentDate);
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

        const allEntries = await this.entryRepository.find({
            where: {
                registered_at: Between(lastMonthDate, currentDate),
            },
            order: {
                registered_at: 'ASC',
            },
        });


        const groupedEntries: { [dateString: string]: { date: Date; entries: number } } = {};

        for (const entry of allEntries) {
            const entryDate = new Date(entry.registered_at.toDateString());
            const dateString = entryDate.toISOString().slice(0, 10);

            if (groupedEntries[dateString]) {
                groupedEntries[dateString].entries++;
            } else {
                groupedEntries[dateString] = {
                    date: entryDate,
                    entries: 1,
                };
            }
        }

        // Convert the object to an array
        return Object.values(groupedEntries);
    }


    async getAllEntriesSinceLastMonths(): Promise<number> {
        const currentDate = new Date();
        const monthsBefore = new Date();
        monthsBefore.setMonth(monthsBefore.getMonth() - 3);

        const entries = await this.entryRepository.count({
            where: {
                registered_at: MoreThanOrEqual(monthsBefore), // Registered after or on monthBefore
            },
        });

        return entries;
    }

    async getAllEntries(): Promise<Entry[]> {
        const entries = await this.entryRepository.find();
        return entries
    }

    async getLastEntry(accountId: string): Promise<Date> {
        const lastEntry = await this.entryRepository
            .createQueryBuilder('entry')
            .where('entry.accountId = :accountId', { accountId })
            .orderBy('entry.registered_at', 'DESC')
            .getOne();

        if (!lastEntry) {
            throw new NotFoundException(`No entries registered for account with id ${accountId}`); // Alternative
        }

        return lastEntry.registered_at;
    }

}