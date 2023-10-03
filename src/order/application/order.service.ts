import { Inject, Injectable } from '@nestjs/common';
import { IOrderService } from '../domain/order.service';
import { OrderBuyIn } from '../domain/port/order.in';
import { IProductRepository } from '../../product/domain/product.repository';
import { Product } from '../../product/domain/product';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';
import { IOrderRepository } from '../domain/order.repository';
import { listToMap } from '../../util/map-util';
import { createOrderCode, createOrderName, mergeOrderProduct, sumTotalCost } from '../domain/order';
import { OrderCreateOut, OrderPaymentCreateBuyOut, OrderProductCreateBuyOut } from '../domain/port/order.out';
import { IOrderPaymentServer } from '../domain/order.payment.server';
import { ICartRepository } from '../../cart/domain/cart.repository';
import { ICartDeleteByBuyOut } from '../../cart/domain/port/cart.out';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject('IOrderRepository') private orderRepository: IOrderRepository,
    @Inject('IProductRepository') private productRepository: IProductRepository,
    @Inject('IOrderPaymentServer') private orderPaymentServer: IOrderPaymentServer,
    @Inject('ICartRepository') private cartRepository: ICartRepository,
  ) {}
  async buy(buyProductIn: OrderBuyIn): Promise<boolean> {
    const buyerId = buyProductIn.buyerId;

    const productIdMap = listToMap(buyProductIn.buyProduct, (product) => product.productId);
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
    const address = buyProductIn.address;

    const paymentResult = await this.orderPaymentServer.request({ ...buyProductIn.card });

    const order: OrderCreateOut = {
      code,
      name,
      totalCost,
    };
    const payment: OrderPaymentCreateBuyOut = {
      ...buyProductIn.card,

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
    const deleteCart: ICartDeleteByBuyOut = {
      buyerId,
      productIdArray: mergeProductArray.map((product) => product.id),
    };

    await this.orderRepository.buy({ buyerId: buyProductIn.buyerId, order: order, payment: payment, buyProduct: orderProduct });
    await this.cartRepository.deleteByBuy(deleteCart);

    return true;
  }
}
