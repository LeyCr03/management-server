import { Controller, Delete, Put, Body, Get, Param, Post } from "@nestjs/common"
import { PaymentService } from "src/service/payment.service"

@Controller('api/payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Delete(':id') 
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        return this.paymentService.deletePayment(id);
    }

    @Post(':id') 
    async create(@Param('id') id: string, @Body() registered_at: Date ) {
        return this.paymentService.createPayment(id, registered_at);
    }


    @Get('payments') 
    async getPayments() {
        return this.paymentService.getMonthlyPayments();
    }

    @Get('monthly-payments') 
    async getMonthlyPayments( ) {
        return this.paymentService.getAllMonthlyPaymentsByDate();
    }

}