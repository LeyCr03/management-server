import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Account } from "src/entity/account.entity";
import { CreateAccountDto, UpdateAccountDto } from "src/dto/account.dto";
import { Entry } from "src/entity/entry.entity";
import { Payment } from "src/entity/payment.entity";
import { AgeRange, Sex, Status } from "src/types";

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        @InjectRepository(Entry)
        private entryRepository: Repository<Entry>,

        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
    ) { }

    async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
        const account = await this.accountRepository.create(createAccountDto);
        const savedAccount = await this.accountRepository.save(account);

        return savedAccount;
    }

    async findById(id: string): Promise<Account | null> { // Find Account by id
        return this.accountRepository.findOne({ where: { id } });
    }
    async findByName(name: string): Promise<Account | null> { // Find Account by email
        return this.accountRepository.findOne({ where: { name } });
    }

    async deleteAccount(id: string): Promise<{ message: string }> { //delete function
        const account = await this.accountRepository.findOne({ where: { id } });

        if (!account) {
            throw new NotFoundException('Account with ID ${id} not found.');
        }

        await this.accountRepository.remove(account);
        return { message: ' Account deleted Succsessfully' };
    }

    async updateAccount(id: string, updateAccountDto: UpdateAccountDto): Promise<{ message: string }> { //update function
        const account = await this.findById(id);
        if (!account) {
            throw new NotFoundException('Account with ID ${id} not found.');
        }
        await this.accountRepository.update(id, updateAccountDto);
        return { message: ' Account Updated' };
    }

    //filter account by sex, agerange, frequecy and status  !pagination

    async getFilteredAccounts(
        sex?: Sex,
        ageRange?: AgeRange,
        status?: Status,
        page: number = 1,
        limit: number = 10,
    ): Promise<{ accounts: Account[]; total: number }> {
        const where: any = {};

        if (sex) {
            where.sex = sex;
        }
        if (status) {
            where.status = status;
        }
        if (ageRange) {
            const [minAge, maxAge] = ageRange.split('-').map(Number);
            where.age = Between(minAge, maxAge);
        }

        const [accounts, total] = await this.accountRepository.findAndCount({
            where,
            skip: (page - 1) * limit, 
            take: limit,  
        });

        return { accounts, total };
    }


    //get frequency and suspension status

    async getAccountFrequencyAndSuspensionStatus(accountId: string): Promise<{
        frequency: number;
        suspensionRisk: boolean;
        daysSinceLastPayment?: number | null;
    }> {
        const account = await this.accountRepository.findOne({
            where: { id: accountId },
            relations: ['payments', 'entries'], // Load the related payments and entries
        });

        if (!account) {
            throw new Error('Account not found');
        }

        //1. Get last payment
        const lastPayment = account.payments.sort((a, b) => b.registered_at.getTime() - a.registered_at.getTime())[0]; // Sort by registered_at (descending)

        //2. Calculate the frecuency
        const entriesAfterLastPayment = account.entries.filter(entry => entry.registered_at > (lastPayment ? lastPayment.registered_at : new Date(0))); // Filter the array of entries

        //3. Calculate the days since the last payment
        const currentDate = new Date();
        const daysSinceLastPayment = lastPayment ? Math.floor((currentDate.getTime() - lastPayment.registered_at.getTime()) / (1000 * 3600 * 24)) : null;

        //4. Calculate the flag for suspension risk
        const suspensionThresholdDays = 30;
        const suspensionRisk = daysSinceLastPayment === null || daysSinceLastPayment > suspensionThresholdDays;

        return {
            frequency: entriesAfterLastPayment.length,
            suspensionRisk: suspensionRisk,
            daysSinceLastPayment: daysSinceLastPayment || null,
        };
    }

    //get revenue
    async calculateAccountRevenue(
        accountId: string,
        pricePerEntry: number, 
        subscriptionPrice: number 
    ): Promise<number> {
        const account = await this.accountRepository.findOne({
            where: { id: accountId },
            relations: ['payments', 'entries'],
        });

        if (!account) {
            throw new Error('Account not found');
        }

        //1. Sort last payment
        const lastPayment = account.payments.sort((a, b) => b.registered_at.getTime() - a.registered_at.getTime())[0]; // Sort by registered_at (descending)

        //2. Calculate the frecquency
        const entriesAfterLastPayment = account.entries.filter(entry => entry.registered_at > (lastPayment ? lastPayment.registered_at : new Date(0))); // Filter the array of entries

        //3. Calculate estimated revenue
        const revenue = (entriesAfterLastPayment.length * pricePerEntry) - subscriptionPrice;

        return revenue;
    }

    async calculateTotalEstimatedRevenue(
        pricePerEntry: number,
        subscriptionPrice: number,
    ): Promise<number> {
        // 1. Get all Accounts
        const accounts = await this.accountRepository.find({ relations: ['payments', 'entries'] });

        // 2. Calculate revenue for each account and sum it up
        let totalRevenue = 0;
        for (const account of accounts) {
            //1. Sort last payments
            const lastPayment = account.payments.sort((a, b) => b.registered_at.getTime() - a.registered_at.getTime())[0]; // Sort by registered_at (descending)

            //2. Calculate the frecquency after last payment
            const entriesAfterLastPayment = account.entries.filter(entry => entry.registered_at > (lastPayment ? lastPayment.registered_at : new Date(0))); // Filter the array of entries

            // Calculate estimated revenue for the single account
            const accountRevenue = (entriesAfterLastPayment.length * pricePerEntry) - subscriptionPrice;
            totalRevenue += accountRevenue;
        }

        return totalRevenue;
    }
}