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
  async getMonthlyPayments():Promise<number> {
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

  async getAllMonthlyPaymentsByDate(): Promise<{ date: Date; payments: number }[]> {
        const currentDate = new Date();
        const lastMonthDate = new Date(currentDate);
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

        const allpayments = await this.paymentRepository.find({
            where: {
                registered_at: Between(lastMonthDate, currentDate),
            },
            order: {
                registered_at: 'ASC',
            },
        });
        const groupedpayments: { [dateString: string]: { date: Date; payments: number } } = {};

        for (const entry of allpayments) {
            const date = new Date(entry.registered_at.toDateString());
            const dateString = date.toISOString().slice(0, 10);

            if (groupedpayments[dateString]) {
                groupedpayments[dateString].payments++;
            } else {
                groupedpayments[dateString] = {
                    date: date,
                    payments: 1,
                };
            }
        }

        // Convert the object to an array
        return Object.values(groupedpayments);
    }

    async getAllPayments(): Promise <Payment[]>{
      const payments = await this.paymentRepository.find();
      return payments
    }
}
