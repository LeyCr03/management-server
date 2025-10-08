import { PaymentService } from "src/service/payment.service";
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    delete(id: string): Promise<{
        message: string;
    }>;
    create(id: string, registered_at: Date): Promise<import("../entity/payment.entity").Payment>;
    getPayments(): Promise<number>;
    getMonthlyPayments(): Promise<{
        date: Date;
        payments: number;
    }[]>;
    geAllPayments(): Promise<import("../entity/payment.entity").Payment[]>;
}
