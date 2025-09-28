import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Account } from "src/entity/account.entity";
import { CreateAccountDto } from "src/dto/account.dto";
import { AgeRange, Sex, Status } from "src/types";
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AccountService {
    private readonly logger;
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
    ) { 
        this.logger = new Logger("Account")
    }

    //create account
    async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
        const account = await this.accountRepository.create(createAccountDto);
        const savedAccount = await this.accountRepository.save(account);

        return savedAccount;
    }

    //find by id
    async findById(id: string): Promise<Account | null> { // Find Account by id
        return this.accountRepository.findOne({ where: { id } });
    }
    //find by name
    async findByName(name: string): Promise<Account | null> { // Find Account by email
        return this.accountRepository.findOne({ where: { name } });
    }
    //delete account
    async deleteAccount(id: string): Promise<{ message: string }> { //delete function
        const account = await this.accountRepository.findOne({ where: { id } });

        if (!account) {
            throw new NotFoundException('Account with ID ${id} not found.');
        }

        await this.accountRepository.remove(account);
        return { message: ' Account deleted Succsessfully' };
    }


    //update account status
    async updateAccount(id: string, status: Status): Promise<{ message: string }> { 
        const account = await this.findById(id);
        if (!account) {
            throw new NotFoundException('Account with ID ${id} not found.');
        }
        await this.accountRepository.update(id, {status});
        return { message: ' Account Updated' };
    }

    //filter account by sex, agerange, frequecy and status with pagination
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


    //get frequency , suspension status and days since last payment

    async getAccountFrequencyAndSuspensionStatus(accountId: string): Promise<{
        frequency: number;
        suspensionRisk: boolean;
        daysSinceLastPayment?: number | null;
    }> {
        const account = await this.accountRepository.findOne({
            where: { id: accountId },
            relations: ['payments', 'entries'],
        });

        if (!account) {
            throw new Error('Account not found');
        }

        const lastPayment = account.payments.sort((a, b) => b.registered_at.getTime() - a.registered_at.getTime())[0]; // Sort by registered_at (descending)

        const entriesAfterLastPayment = account.entries.filter(entry => entry.registered_at > (lastPayment ? lastPayment.registered_at : new Date(0))); // Filter the array of entries

        const currentDate = new Date();
        const daysSinceLastPayment = lastPayment ? Math.floor((currentDate.getTime() - lastPayment.registered_at.getTime()) / (1000 * 3600 * 24)) : null;

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

        const lastPayment = account.payments.sort((a, b) => b.registered_at.getTime() - a.registered_at.getTime())[0]; 

        const entriesAfterLastPayment = account.entries.filter(entry => entry.registered_at > (lastPayment ? lastPayment.registered_at : new Date(0))); 

        const revenue = (entriesAfterLastPayment.length * pricePerEntry) - subscriptionPrice;

        return revenue;
    }

    async calculateTotalRevenue(
        pricePerEntry: number,
        subscriptionPrice: number,
    ): Promise<number> {
        const accounts = await this.accountRepository.find({ relations: ['payments', 'entries'] });

        let totalRevenue = 0;
        for (const account of accounts) {
            const lastPayment = account.payments.sort((a, b) => b.registered_at.getTime() - a.registered_at.getTime())[0]; 

            //2. Calculate the frecquency after last payment
            const entriesAfterLastPayment = account.entries.filter(entry => entry.registered_at > (lastPayment ? lastPayment.registered_at : new Date(0))); 

            // Calculate estimated revenue for the single account
            const accountRevenue = (entriesAfterLastPayment.length * pricePerEntry) - subscriptionPrice;
            totalRevenue += accountRevenue;
        }

        return totalRevenue;
    }

    //!automathic suspension
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Runs every day at midnight
    async suspendAccounts(): Promise<void> {
        this.logger.log('Starting daily account suspension check...');
        const accounts = await this.accountRepository.find({
            where: { status: Status.ACTIVE },
            relations: ['payments'],
        });

        for (const account of accounts) {
            try {
                //1. Sort the payments to retrieve the last payment of account
                const lastPayment = account.payments.sort((a, b) => b.registered_at.getTime() - a.registered_at.getTime())[0];

                if (!lastPayment) {
                    // No payments found, suspend immediately.
                    account.status = Status.SUSPENDED;
                    await this.accountRepository.save(account);
                    this.logger.log(`Account ${account.id} suspended due to no payments.`);
                    continue; // Move to the next account
                }
                //2. Get currentDate
                const currentDate = new Date();

                // 3. Calculate the suspendedDate
                const suspendDate = new Date(lastPayment.registered_at);
                suspendDate.setMonth(suspendDate.getMonth() + 1); // Add one month
                suspendDate.setDate(suspendDate.getDate() + 1);    // Add one day

                //If Currentdate is greather than the suspend Date suspends the account
                if (currentDate > suspendDate) {
                    account.status = Status.SUSPENDED;
                    await this.accountRepository.save(account);
                    this.logger.log(`Account ${account.id} suspended due to overdue payment.`);
                }
            } catch (error) {
                this.logger.error(`Failed to process account ${account.id}: ${error.message}`, error.stack);
            }
        }

        this.logger.log('Account suspension check complete.');
    }
}