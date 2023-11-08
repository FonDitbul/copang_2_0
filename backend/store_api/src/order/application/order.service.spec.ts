import { OrderService } from './order.service';
import { mock, MockProxy } from 'jest-mock-extended';
import { IOrderRepository } from '../domain/order.repository';
import { IProductRepository } from '../../product/domain/product.repository';
import { IOrderPaymentServer } from '../domain/order.payment.server';
import { OrderCard } from '../domain/orderCard';
import { OrderBuyProduct } from '../domain/orderBuyProduct';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';
import { ICartRepository } from '../../cart/domain/cart.repository';
import { IOrderProductRepository } from '../domain/orderProduct.repository';
import { OrderFindAllOrderProductIn } from '../domain/port/orderProduct.in';
import { OrderProduct } from '../domain/orderProduct';
import { CommandBus } from '@nestjs/cqrs';
import { OrderBuyIn } from '../domain/port/order.in';
import { OrderBuyCommand } from '../domain/order.buy.command';

describe('order Service test', () => {
  const orderProductRepository: MockProxy<IOrderProductRepository> = mock<IOrderProductRepository>();
  const commandBus: MockProxy<CommandBus> = mock<CommandBus>();

  const sut = new OrderService(orderProductRepository, commandBus);

  describe('buy 물품 구매 메소드 coomand 테스트', () => {
    it('command 를 성공적으로 호출한 경우', async () => {
      const givenBuyIn: OrderBuyIn = {
        address: '',
        buyProduct: [],
        buyerId: 0,
        card: {
          bankName: '테스트 은행',
          cardNumber: '1234-4555-1521-1234',
          cardType: '신용',
          method: 'CARD',
          type: 'CARD',
          validityPeriod: '04/25',
        },
      };

      await sut.buy(givenBuyIn);

      expect(commandBus.execute).toHaveBeenCalledWith(new OrderBuyCommand(givenBuyIn));
    });
  });

  describe('구매한 물품 history 보기 테스트', () => {
    function FakeOrderProduct(): OrderProduct {
      return {
        address: 'address',
        buyQuantity: 0,
        buyerId: 0,
        code: 'code',
        cost: 0,
        createdAt: undefined,
        deletedAt: undefined,
        description: 'description',
        id: 0,
        information: 'information',
        name: 'name',
        orderId: 0,
        productId: 0,
        reviewId: 0,
        sellerId: 0,
        mainImage: '',
        shippingStatus: undefined,
        updatedAt: undefined,
      };
    }
    it('buyerId 를 통해 구매한 물품 리스트가 성공적으로 반환한 경우', async () => {
      const givenIn: OrderFindAllOrderProductIn = {
        buyerId: 1,
        lastId: 1,
        limit: 20,
      };

      orderProductRepository.findAllByBuyerIdNoOffset.mockResolvedValue([FakeOrderProduct()]);

      const result = await sut.findAllOrderProduct(givenIn);

      expect(result[0]).toEqual({
        address: 'address',
        buyQuantity: 0,
        buyerId: 0,
        code: 'code',
        cost: 0,
        description: 'description',
        id: 0,
        information: 'information',
        name: 'name',
        mainImage: '',
        orderId: 0,
        productId: 0,
        reviewId: 0,
        sellerId: 0,
        shippingStatus: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
      });
    });
  });
});
