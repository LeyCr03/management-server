import { Controller, Delete, Put, Body, Get, Param } from "@nestjs/common"
import { PaymentService } from "src/service/payment.service"

@Controller('api/payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Delete(':id') 
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        return this.paymentService.deletePayment(id);
    }

    @Put(':id') 
    async create(@Param('id') id: string, @Body() registered_at: Date ) {
        return this.paymentService.createPayment(id, registered_at);
    }


    @Get(':id') 
    async getPaymentById(@Param('id') id: string) {
        return this.paymentService.findById(id);
    }

    @Get('by-date')
    async getPaymentsByDate(@Body() date: Date) {
        return this.paymentService.findAllByDate(date);
    }


    @Get('account-payments/:id') 
    async getAccountPayments(@Param('id') id: string) {
        return this.paymentService.getAllAccountsPayments(id);
    }

    @Get('monthly-payments') 
    async getMonthlyPayments( ) {
        return this.paymentService.getAllMonthlyPayments();
    }

}