import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from 'src/controller/payment.controller';
import { Account } from 'src/entity/account.entity';
import { Payment } from 'src/entity/payment.entity';
import { PaymentService } from 'src/service/payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment,Account]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule {}