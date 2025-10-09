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

  async deletePayment(id: string): Promise<{ message: string }> { //delete function
    const payment = await this.paymentRepository.findOne({ where: { id } });

    if (!payment) {
      throw new NotFoundException('Payment with ID ${id} not found.');
    }

    await this.paymentRepository.remove(payment);
    return { message: ' Account deleted Succsessfully' };
  }


  //get all payments done during the last month
  async getMonthlyPayments(): Promise<number> {
    const currentDate = new Date();
    const lastMonthDate = new Date(currentDate);
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);


    const payments = await this.paymentRepository.count({
      where: {
        registered_at: Between(currentDate, lastMonthDate),
      },
    });

    return payments;
  }

  async getAllPayments(): Promise<Payment[]> {
    const payments = await this.paymentRepository.find();
    return payments
  }

  async getRevenueData(pricePerEntry: number): Promise<{ date: Date; revenue: number }[]> {
    const currentDate = new Date();
    const monthDate = new Date(currentDate);
    monthDate.setMonth(monthDate.getMonth() - 1);

    // Fetch all payments within the last 3 months
    const allPayments = await this.paymentRepository.find({
      where: {
        registered_at: Between(monthDate, currentDate),
      },
      order: {
        registered_at: 'ASC',
      },
    });

    const groupedPayments: { [dateString: string]: { date: Date; revenue: number } } = {};

    for (const payment of allPayments) {
      const date = new Date(payment.registered_at.toDateString());
      const dateString = date.toISOString().slice(0, 10);

      if (groupedPayments[dateString]) {
        groupedPayments[dateString].revenue += pricePerEntry;
      } else {
        groupedPayments[dateString] = {
          date: date,
          revenue: pricePerEntry,
        };
      }
    }

    return Object.values(groupedPayments);
  }

  async getLastPayment(accountId: string): Promise<Date > {
    const lastPayment = await this.paymentRepository
      .createQueryBuilder('payment')
      .where('payment.accountId = :accountId', { accountId })
      .orderBy('payment.registered_at', 'DESC')
      .getOne();

    if (!lastPayment) {
      throw new NotFoundException(`No payments registered for account with id ${accountId}`); // Alternative
    }

    return lastPayment.registered_at;
  }
}
