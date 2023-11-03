import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OrderProductRepository } from './orderProduct.repository';

@Injectable()
export class ShippingBatchService {
  constructor(@Inject('OrderProductRepository') private orderProductRepository: OrderProductRepository) {}

  @Cron('* 0/10 * * * *')
  async updateToShipping() {
    const orderProductArray = await this.orderProductRepository.findAllReady();

    const orderProductIdArray = orderProductArray.map((op) => op.id);

    await this.orderProductRepository.updateToShipping(orderProductIdArray);
  }

  @Cron('0 0/15 * * * *')
  async updateToShippingComplete() {
    const orderProductArray = await this.orderProductRepository.findAllShipping();

    const orderProductIdArray = orderProductArray.map((op) => op.id);

    await this.orderProductRepository.updateToShippingComplete(orderProductIdArray);
  }
}
