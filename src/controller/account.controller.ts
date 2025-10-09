import { Controller, Delete, Put, Body, Get, Param, DefaultValuePipe, ParseEnumPipe, ParseIntPipe, Query, Post } from "@nestjs/common"
import { CreateAccountDto } from "src/dto/account.dto"
import { Account } from "src/entity/account.entity"
import { AccountService } from "src/service/account.service"
import { Status } from "src/types"

@Controller('api/accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) { }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        return this.accountService.deleteAccount(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() name: string
    ): Promise<{ message: string }> {
        return this.accountService.updateAccount(id, name);
    }

    @Post()
    async create(@Body() createAccountDto: CreateAccountDto) {
        return await this.accountService.createAccount(createAccountDto);
    }

    @Get(':id')
    async getAccountById(@Param('id') id: string) {
        return this.accountService.findById(id);
    }

    @Get('by-name/:name')
    async getAccountByName(@Param('name') name: string) {
        return this.accountService.findByName(name);
    }

    @Get('last/payment/:id')
    async getAccountLastPayment(
        @Param('id') id: string,
    ): Promise<Date> {
        const last_payment = await this.accountService.getLastPayment(id);
        return last_payment;
    }

    @Get('last/entry/:id')
    async getAccountLastEntry(
        @Param('id') id: string,
    ) {
        return this.accountService.getLastEntry(id);
    }

    @Get('ordered/by/last/payment')
    async getAllAccountsByPayment() {
        return this.accountService.getAllAccountsByLastPayment();
    }

    @Get('ordered/by/last/entry')
    async getAllAccountsByEntry() {
        return this.accountService.getAllAccountsByLastEntry();
    }

    @Get('by/registration')
    async getAllAccountsByRegistration(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,  // Use DefaultValuePipe and ParseIntPipe
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
    ) {
        return this.accountService.getAllAccountsByRegistration(page, limit);
    }

    @Get('filter/by')
    async getFilteredAccounts(
        @Query('search') search?: string,
        @Query('status') status?: Status
    ) {
        return this.accountService.getFilteredAccounts(search, status);
    }

    @Get('revenue/:id')
    async getAccountRevenue(
        @Param('id') id: string,
        @Query('pricePerEntry') pricePerEntry: number,
        @Query('subscriptionPrice') subscriptionPrice: number
    ) {
        return this.accountService.calculateAccountRevenue(id, pricePerEntry, subscriptionPrice);
    }


    @Get('total/revenue')
    async getRevenue(
        @Query('pricePerEntry') pricePerEntry: number,
        @Query('subscriptionPrice') subscriptionPrice: number
    ) {
        return this.accountService.calculateTotalRevenue(pricePerEntry, subscriptionPrice);
    }

    @Get('suspension/status/:id')
    async getSuspension(@Param('id') id: string) {
        return this.accountService.getSuspensionStatus(id);
    }


    @Get('suspension/report')
    async getRiskReport() {
        return this.accountService.reportSuspensionRisks();
    }

    @Get('sex/data')
    async getSexMetrics() {
        return this.accountService.getSexMetrics();
    }

    @Get('age/data')
    async getAgeMetrics() {
        return this.accountService.getAgeMetrics();
    }

    @Get('month/customers/data')
    async getMonthNewCustomers() {
        return this.accountService.getAllMonthNewCustomers();
    }

    @Get('new/customers')
    async getNewCustomers() {
        return this.accountService.getAllNewCustomers();
    }

    @Get('active/accounts')
    async getActiveAccounts() {
        return this.accountService.getAllActiveAccounts();
    }

    @Get('entries/after/payment/:id')
    async getEntriesAfterLastPayment(
        @Param('id') id: string) {
        return this.accountService.getEntriesAfterLastPayment(id)
    }

    @Get('frequency/:id')
    async getFreqency(
        @Param('id') id: string) {
        return this.accountService.getAccountFrequency(id)
    }


}