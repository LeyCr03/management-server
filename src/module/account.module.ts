import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from 'src/controller/account.controller';
import { Account } from 'src/entity/account.entity';
import { AccountService } from 'src/service/account.service';
import { EntryModule } from './entry.module';
import { PaymentModule } from './payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    EntryModule,
    PaymentModule
  ],
  controllers: [AccountController],
  providers: [AccountService, Logger],
  exports: [AccountService]
})
export class AccountModule {}
