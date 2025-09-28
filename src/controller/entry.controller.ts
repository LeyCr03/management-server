import { Controller, Delete, Put, Body, Get, Param } from "@nestjs/common"
import { EntryService } from "src/service/entry.service";

@Controller('api/entries')
export class EntriesController {
    constructor(private readonly entryService: EntryService) { }

    @Delete(':id') 
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        return this.entryService.deleteEntry(id);
    }

    @Put(':id') 
    async create(@Param('id') id: string, @Body() registered_at: Date ) {
        return this.entryService.createEntry(id, registered_at);
    }


    @Get(':id') 
    async getEntryById(@Param('id') id: string) {
        return this.entryService.findById(id);
    }

    @Get('by-date')
    async getEntriesByDate(@Body() date: Date) {
        return this.entryService.findAllByDate(date);
    }


    @Get('account-entries/:id') 
    async getAccountEntries(@Param('id') id: string) {
        return this.entryService.getAllAccountsEntries(id);
    }

    @Get('monthly-entries') 
    async getMonthlyEntries( ) {
        return this.entryService.getAllMonthlyEntries();
    }

}