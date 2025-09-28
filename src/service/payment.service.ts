import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Account } from "src/entity/account.entity";
import { Payment } from "src/entity/payment.entity";
import { Status } from "src/types";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) { }

  //create payment and update account status to active
  async createPayment(accountId: string, registered_at: Date): Promise<Payment> {
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
    await this.accountRepository.update(accountId, { status: Status.ACTIVE })

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

  //get all payments dne by an account
  async getAllAccountsPayments(accountId: string): Promise<Payment[]> {
    const account = await this.accountRepository.findOne({ where: { id: accountId } })
    if (!account) {
      throw new NotFoundException('Account not found')
    }

    return this.paymentRepository.find({ where: { accountId } });
  }

  //get all payments done during the last month
  async getAllMonthlyPayments():Promise<Payment[]> {
    const currentDate = new Date();
    const lastMonthDate = new Date(currentDate);
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

   
    const payments = await this.paymentRepository.find({
      where: {
        registered_at: Between(currentDate, lastMonthDate),
      },
    });

    return payments;
  }
}
