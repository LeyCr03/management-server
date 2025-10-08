import { InjectRepository } from "@nestjs/typeorm";
import { Between, FindManyOptions, ILike, MoreThanOrEqual, Repository } from "typeorm";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Account } from "src/entity/account.entity";
import { CreateAccountDto } from "src/dto/account.dto";
import { Sex, Status } from "src/types";
import { Cron, CronExpression } from '@nestjs/schedule';
import { Entry } from "src/entity/entry.entity";

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
        console.log({ createAccountDto })
        const account = await this.accountRepository.create(createAccountDto);
        console.log({ account })
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
    async updateAccount(id: string, name?: string): Promise<{ message: string }> {
        const account = await this.findById(id);
        if (!account) {
            throw new NotFoundException('Account with ID ${id} not found.');
        }
        await this.accountRepository.update(id, { name });
        return { message: ' Account Updated' };
    }

    //get las_payment
    async getLastPayment(accountId: string) {
        const account = await this.findById(accountId);
        if (!account) {
            throw new NotFoundException('Account with ID ${accountId} not found.');
        }
        
        if(!account.payments) {
            throw new NotFoundException(`No payments registered for account with id ${accountId}`)
        }

        const last_payment = account.payments[0].registered_at;

        return last_payment
    }

    //get last_entry
    async getLastEntry(accountId: string) {
        const account = await this.findById(accountId);
        if (!account) {
            throw new NotFoundException('Account with ID ${accountId} not found.');
        }
        if(!account.entries) {
            throw new NotFoundException(`No entries registered for account with id ${accountId}`)
        }

        const last_entry = account.entries[0].registered_at;

        return last_entry
    }

    async getEntriesAfterLastPayment(accountId: string): Promise<Entry[]> {
        const account = await this.findById(accountId);
        if (!account) {
            throw new NotFoundException('Account with ID ${id} not found.');
        }
        const last_payment = await this.getLastPayment(accountId);
        const entriesAfterLastPayment = account.entries.filter(entry => entry.registered_at > (last_payment ? last_payment : new Date(0)));
        return entriesAfterLastPayment;

    }


    //!filter accounts by status or name with pagination

    async getFilteredAccounts(
        search?: string,
        status?: Status,
        page: number = 1,
        limit: number = 10,
    ): Promise<{ accounts: Account[]; total: number }> {

        const where: any = {};

        if (status) {
            where.status = status;
        }

        if (search) {
            where.name = ILike(`%${search}%`);
        }

        const findOptions: FindManyOptions<Account> = {
            where,
            skip: (page - 1) * limit,
            take: limit,
        };

        const [accounts, total] = await this.accountRepository.findAndCount(findOptions);

        return { accounts, total };
    }

   async getAllAccountsByRegistration(
        page: number = 1,
        limit: number = 10
    ): Promise<{ accounts: Account[]; total: number }> {

        const skip = (page - 1) * limit;

        const [accounts, total] = await this.accountRepository.findAndCount({
            order: {
                registered_at: 'DESC', // Order by most recent registration
            },
            skip: skip,
            take: limit,
        });

        return { accounts, total };
    }

    //!find all accounts paginated
    async getAllAccountsByLastPayment(
    ): Promise<{ accounts: Account[]; total: number }> {
        const page = 1;
        const limit = 10;
        

        const skip = (page - 1) * limit;

        const [accounts, total] = await this.accountRepository.createQueryBuilder('account')
            .leftJoinAndSelect('account.payments', 'payment') // Join payments relationship
            .orderBy('payment.registered_at', 'DESC') // Order by most recent paymentDate
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        return { accounts, total };
    }

    //find all by last entry
    async getAllAccountsByLastEntry(
        page: number = 1,
        limit: number = 10
    ): Promise<{ accounts: Account[]; total: number }> {

        const skip = (page - 1) * limit;

        const [accounts, total] = await this.accountRepository.createQueryBuilder('account')
            .leftJoinAndSelect('account.entries', 'entry') // Join payments relationship
            .orderBy('entry.registered_at', 'DESC') // Order by most recent paymentDate
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        return { accounts, total };
    }

    //get frequency , suspension status and days since last payment

    async getAccountFrequency(accountId: string): Promise<number> {
        const frequency = await this.getEntriesAfterLastPayment(accountId);
        return frequency.length;
    }


    async getSuspensionStatus(accountId: string) {

        const last_payment = await this.getLastPayment(accountId);
        const currentDate = new Date();
        const daysSinceLastPayment = last_payment ? Math.floor((currentDate.getTime() - last_payment.getTime()) / (1000 * 3600 * 24)) : null;
        const suspensionThresholdDays = 30;
        const suspensionRisk = daysSinceLastPayment === null || daysSinceLastPayment > suspensionThresholdDays;

        return { suspensionRisk, daysSinceLastPayment }
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

                if (!account.payments || account.payments.length === 0) { // Check if payments exist BEFORE sorting
                    account.status = Status.SUSPENDED;
                    await this.accountRepository.save(account);
                    this.logger.log(`Account ${account.id} suspended due to no payments.`);
                    continue; // M
                }

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


    //Notifications for suspensions risk
    async reportSuspensionRisks(): Promise<Account[]> {
        const accounts = await this.accountRepository.find({
            where: { status: Status.ACTIVE },
            relations: ['payments'],
        });

        const riskedAccounts: Account[] = [];

        for (const account of accounts) {
            if (!account.payments || account.payments.length === 0) { // Check if payments exist BEFORE sorting
                account.status = Status.SUSPENDED;
                await this.accountRepository.save(account);
                continue; // Move to the next account
            }

            const lastPayment = account.payments.sort((a, b) => b.registered_at.getTime() - a.registered_at.getTime())[0];

            const currentDate = new Date();
            const suspendDate = new Date(lastPayment.registered_at);

            suspendDate.setMonth(suspendDate.getMonth() + 1);
            const timeDiff = suspendDate.getTime() - currentDate.getTime();
            const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

            if (dayDiff <= 1) {
                riskedAccounts.push(account);
            }


        }

        return riskedAccounts;
    }

    async getSexMetrics() {
        const females = await this.accountRepository.count({
            where: { sex: Sex.FEMALE }
        })

        const males = await this.accountRepository.count({
            where: { sex: Sex.MALE }
        })
        return { females, males };
    }

    async getAgeMetrics() {
        const age18to25 = await this.accountRepository.count({
            where: { age: Between(18, 25) },
        });

        const age25to35 = await this.accountRepository.count({
            where: { age: Between(26, 35) }, // Corrected start age to 26
        });

        const age35to45 = await this.accountRepository.count({
            where: { age: Between(36, 45) }, // Corrected start age to 36
        });

        const age45to70 = await this.accountRepository.count({
            where: { age: Between(46, 70) }, // Corrected start age to 46
        });

        return {
            '18-25': age18to25,
            '25-35': age25to35,
            '35-45': age35to45,
            '45-70': age45to70,
        };
    }

    //Get all new customers since last 3 month by date
    async getAllMonthNewCustomers(): Promise<{ date: Date; accounts: number }[]> {
        const currentDate = new Date();
        const monthDate = new Date(currentDate);
        monthDate.setMonth(monthDate.getMonth() - 3);

        const allNewAccounts = await this.accountRepository.find({
            where: {
                registered_at: Between(monthDate, currentDate),
            },
            order: {
                registered_at: 'ASC',
            },
        });


        const groupedAccounts: { [dateString: string]: { date: Date; accounts: number } } = {};

        for (const account of allNewAccounts) {
            const date = new Date(account.registered_at.toDateString());
            const dateString = date.toISOString().slice(0, 10);

            if (groupedAccounts[dateString]) {
                groupedAccounts[dateString].accounts++;
            } else {
                groupedAccounts[dateString] = {
                    date: date,
                    accounts: 1,
                };
            }
        }

        // Convert the object to an array
        return Object.values(groupedAccounts);
    }

    async getAllNewCustomers(): Promise<number> {
        const currentDate = new Date();
        const monthsBefore = new Date();
        monthsBefore.setMonth(monthsBefore.getMonth() - 3);

        const accounts = await this.accountRepository.count({
            where: {
                registered_at: MoreThanOrEqual(monthsBefore), // Registered after or on monthBefore
            },
        });

        return accounts;
    }


    async getAllActiveAccounts() {
        const accounts = await this.accountRepository.count({
            where: { status: Status.ACTIVE }
        })

        return accounts;
    }



}