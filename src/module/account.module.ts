import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from 'src/controller/account.controller';
import { Account } from 'src/entity/account.entity';
import { AccountService } from 'src/service/account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
  ],
  controllers: [AccountController],
  providers: [AccountService, Logger],
  exports: [AccountService]
})
export class AccountModule {}