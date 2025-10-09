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

    @Get('tree/month') 
    async getEntries() {
        return this.entryService.getAllEntriesSinceLastMonths();
    }

    @Get('month/data') 
    async getMonthlyEntries( ) {
        return this.entryService.getAllMonthlyEntries();
    }

    @Get('all') 
    async geAllEntries( ) {
        return this.entryService.getAllEntries();
    }


}