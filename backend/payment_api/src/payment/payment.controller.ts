import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRequestDto } from './payment.req.dto';

@Controller('/payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('')
  async create(@Body() paymentDto: PaymentRequestDto) {
    return await this.paymentService.create(paymentDto);
  }
}