import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderBuyCommand } from '../domain/order.buy.command';
import { Inject } from '@nestjs/common';
import { IOrderRepository } from '../domain/order.repository';
import { IProductRepository } from '../../product/domain/product.repository';
import { IOrderPaymentServer } from '../domain/order.payment.server';
import { listToMap } from '@libs/utils';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';
import { createOrderCode, createOrderName, mergeOrderProduct, sumTotalCost } from '../domain/order';
import { Product } from '../../product/domain/product';
import { OrderBuyOut, OrderCreateOut, OrderPaymentCreateBuyOut, OrderProductCreateBuyOut } from '../domain/port/order.out';

@CommandHandler(OrderBuyCommand)
export class OrderBuyHandler implements ICommandHandler<OrderBuyCommand> {
  constructor(
    @Inject('IOrderRepository') private orderRepository: IOrderRepository,
    @Inject('IProductRepository') private productRepository: IProductRepository,
    @Inject('IOrderPaymentServer') private orderPaymentServer: IOrderPaymentServer,
  ) {}

  async execute(command: OrderBuyCommand) {
    const buyIn = command.orderBuyIn;

    const productIdMap = listToMap(buyIn.buyProduct, (product) => product.productId);
    const productIdArray = Array.from(productIdMap.keys());

    const productArray = await this.productRepository.findAllById(productIdArray);

    if (productArray.length !== productIdArray.length) {
      throw new CoPangException(EXCEPTION_STATUS.PRODUCT_NOT_EXIST);
    }

    const mergeProductMap = mergeOrderProduct(productArray, productIdMap);
    const mergeProductArray = Array.from(mergeProductMap.values());

    for (const product of mergeProductArray) {
      if (!product.isSale) {
        throw new CoPangException(EXCEPTION_STATUS.PRODUCT_NOT_AVAILABLE_BUY);
      }
      if (Product.isDeleted(product)) {
        throw new CoPangException(EXCEPTION_STATUS.PRODUCT_NOT_EXIST);
      }
      if (Product.isOverQuantity(product, product.buyQuantity)) {
        throw new CoPangException(EXCEPTION_STATUS.PRODUCT_NOT_AVAILABLE_BUY);
      }
    }

    const productNameArray = productArray.map((product) => product.name);
    const totalCost = mergeProductArray.reduce(sumTotalCost, 0);
    const code = createOrderCode();
    const name = createOrderName(productNameArray);
    const now = new Date();
    const address = buyIn.address;

    const paymentResult = await this.orderPaymentServer.request({ ...buyIn.card });

    const order: OrderCreateOut = {
      code,
      name,
      totalCost,
    };
    const payment: OrderPaymentCreateBuyOut = {
      ...buyIn.card,

      orderCode: code,
      orderName: name,
      paymentKey: paymentResult.paymentKey,
      requestAt: now,
      totalAmount: totalCost,
    };
    const orderProduct: OrderProductCreateBuyOut[] = mergeProductArray.map((product) => {
      return {
        ...product,
        productId: product.id,
        address,
      };
    });

    const buyOut: OrderBuyOut = { buyerId: buyIn.buyerId, order: order, payment: payment, buyProduct: orderProduct };

    await this.orderRepository.buy(buyOut);
    return buyOut;
  }
}
