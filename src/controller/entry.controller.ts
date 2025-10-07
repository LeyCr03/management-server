import { Controller, Delete, Put, Body, Get, Param, Post } from "@nestjs/common"
import { EntryService } from "src/service/entry.service";

@Controller('api/entries')
export class EntriesController {
    constructor(private readonly entryService: EntryService) { }

    @Delete(':id') 
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        return this.entryService.deleteEntry(id);
    }

    @Post(':id') 
    async create(@Param('id') id: string ) {
        return this.entryService.createEntry(id);
    }

    @Get('entries') 
    async getEntries() {
        return this.entryService.getAllEntriesSinceLastMonths();
    }

    @Get('monthly/entries') 
    async getMonthlyEntries( ) {
        return this.entryService.getAllMonthlyEntries();
    }

}