import { Controller, Delete, Put, Body, Get, Param, DefaultValuePipe, ParseEnumPipe, ParseIntPipe, Query } from "@nestjs/common"
import { CreateAccountDto } from "src/dto/account.dto"
import { Account } from "src/entity/account.entity"
import { AccountService } from "src/service/account.service"
import { AgeRange, Sex, Status } from "src/types"

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

    @Put() 
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


    @Get()
    async getFilteredAccounts(
        @Query('sex', new ParseEnumPipe(Sex, { optional: true })) sex?: Sex,
        @Query('ageRange') ageRange?: AgeRange,
        @Query('status', new ParseEnumPipe(Status, { optional: true })) status?: Status,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<{ accounts: Account[]; total: number }> {
        return this.accountService.getFilteredAccounts(sex, ageRange, status, page, limit);
    }

    @Get('suspension-metrics/:id') 
    async getAccountSuspensionMetrics(@Param('id') id: string) {
        return this.accountService.getAccountFrequencyAndSuspensionStatus(id);
    }

    @Get('revenue/:id') 
    async getAccountRevenue(
        @Param('id') id: string,
        @Query('pricePerEntry') pricePerEntry: number,
        @Query('subscriptionPrice') subscriptionPrice: number
    ) {
        return this.accountService.calculateAccountRevenue(id, pricePerEntry, subscriptionPrice);
    }

    @Get('revenue/total')
    async getRevenue(
        @Query('pricePerEntry') pricePerEntry: number,
        @Query('subscriptionPrice') subscriptionPrice: number
    ) {
        return this.accountService.calculateTotalRevenue(pricePerEntry, subscriptionPrice);
    }
}