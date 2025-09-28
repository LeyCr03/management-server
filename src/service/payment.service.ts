import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Account } from "src/entity/account.entity";
import { Payment } from "src/entity/payment.entity";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) { }

  async createPayment(accountId: string, registered_at: Date): Promise<Payment>{
    const account = await this.accountRepository.findOne({ where: { id: accountId } })
        if (!account) {
            throw new NotFoundException('Account not found')
        }
    const payment = await this.paymentRepository.create({
        accountId,
        account,
        registered_at
    });
    const savedpayment = await this.paymentRepository.save(payment);

    return savedpayment;
  }

  async findById(id: string): Promise<Payment | null> { // Find Payment by id
    return this.paymentRepository.findOne({ where: { id } });
  }
  async findAllByDate(date: Date): Promise<Payment[] | null> { // Find Payments by date
    return this.paymentRepository.find({ where: { registered_at: date } });
  }

  async deletePayment(id: string): Promise<{ message: string }> { //delete function
    const payment = await this.paymentRepository.findOne({ where: { id } });

    if (!payment) {
      throw new NotFoundException('Payment with ID ${id} not found.');
    }

    await this.paymentRepository.remove(payment);
    return { message: ' Account deleted Succsessfully' };
  }
}