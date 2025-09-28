import { PaymentService } from "src/service/payment.service";
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    delete(id: string): Promise<{
        message: string;
    }>;
    create(id: string, registered_at: Date): Promise<import("../entity/payment.entity").Payment>;
    getPaymentById(id: string): Promise<import("../entity/payment.entity").Payment | null>;
    getPaymentsByDate(date: Date): Promise<import("../entity/payment.entity").Payment[] | null>;
    getAccountPayments(id: string): Promise<import("../entity/payment.entity").Payment[]>;
    getMonthlyPayments(): Promise<import("../entity/payment.entity").Payment[]>;
}
