import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Account } from "src/entity/account.entity";
import { Entry } from "src/entity/entry.entity";

@Injectable()
export class EntryService {
    constructor(
        @InjectRepository(Entry)
        private readonly entryRepository: Repository<Entry>,
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
    ) { }

    async createEntry(accountId: string, registered_at: Date): Promise<Entry> {
        const account = await this.accountRepository.findOne({ where: { id: accountId } })
        if (!account) {
            throw new NotFoundException('Account not found')
        }
        const entry = await this.entryRepository.create(
            {
                registered_at,
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
    async findAllByDate(date: Date): Promise<Entry[]> { // Find Entries by date
        return this.entryRepository.find({ where: { registered_at: date } });
    }

    async deleteEntry(id: string): Promise<{ message: string }> { //delete function
        const entry = await this.entryRepository.findOne({ where: { id } });

        if (!entry) {
            throw new NotFoundException('Entry with ID ${id} not found.');
        }

        await this.entryRepository.remove(entry);
        return { message: 'Entry deleted Succsessfully' };
    }

}