import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesController } from 'src/controller/entry.controller';
import { Account } from 'src/entity/account.entity';
import { Entry } from 'src/entity/entry.entity';
import { EntryService } from 'src/service/entry.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entry, Account]),
  ],
  controllers: [EntriesController],
  providers: [EntryService],
  exports: [EntryService]
})
export class EntryModule {}