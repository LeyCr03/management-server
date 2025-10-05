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
        @Body() status: Status
    ): Promise<{ message: string }> {
        return this.accountService.updateAccount(id, status);
    }

    @Post()
    async create(@Body() createAccountDto: CreateAccountDto) {
        return this.accountService.createAccount(createAccountDto);
    }

    @Get(':id')
    async getAccountById(@Param('id') id: string) {
        return this.accountService.findById(id);
    }

    @Get('by-name/:name')
    async getAccountByName(@Param('name') name: string) {
        return this.accountService.findByName(name);
    }

    @Get('revenue/:id')
    async getAccountRevenue(
        @Param('id') id: string,
        @Query('pricePerEntry') pricePerEntry: number,
        @Query('subscriptionPrice') subscriptionPrice: number
    ) {
        return this.accountService.calculateAccountRevenue(id, pricePerEntry, subscriptionPrice);
    }

    @Get('last-payment/:id')
    async getAccountLastPayment(
        @Param('id') id: string,
    ) {
        return this.accountService.getLastPayment(id);
    }

    @Get('last-entry/:id')
    async getAccountLastEntry(
        @Param('id') id: string,
    ) {
        return this.accountService.getLastEntry(id);
    }

    @Get('entries-after-last-payment/:id')
    async getAccountEntiesAfterLastPayment(
        @Param('id') id: string,
    ) {
        return this.accountService.getEntriesAfterLastPayment(id);
    }

    @Get('accounts')
    async getAllAccounts( ) {
        return this.accountService.getAllAccountsByLastPayment();
    }
    
    @Get('by-filter')
    async getFilteredAccounts(
        @Query('search') search?: string,
        @Query('status') status?: Status
    ) {
        return this.accountService.getFilteredAccounts(search, status);
    }

    @Get('revenue/total')
    async getRevenue(
        @Query('pricePerEntry') pricePerEntry: number,
        @Query('subscriptionPrice') subscriptionPrice: number
    ) {
        return this.accountService.calculateTotalRevenue(pricePerEntry, subscriptionPrice);
    }

    @Get('frequency/:id')
    async getFrequency(@Param('id') id: string) {
        return this.accountService.getAccountFrequency(id);
    }

     @Get('suspension-status/:id')
    async getSuspension(@Param('id') id: string) {
        return this.accountService.getSuspensionStatus(id);
    }


    @Get('suspension-report')
    async getRiskReport( ) {
        return this.accountService.reportSuspensionRisks();
    }

    @Get('sex/metrics')
    async getSexMetrics( ) {
        return this.accountService.getSexMetrics();
    }

    @Get('age/metrics')
    async getAgeMetrics( ) {
        return this.accountService.getAgeMetrics();
    }

    @Get('month-new-customers')
    async getMonthNewCustomers( ) {
        return this.accountService.getAllMonthNewCustomers();
    }

    @Get('new-customers')
    async getNewCustomers( ) {
        return this.accountService.getAllNewCustomers();
    }

    @Get('active-accounts')
    async getActiveAccounts( ) {
        return this.accountService.getAllActiveAccounts();
    }

}