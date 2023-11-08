import { OrderService } from './order.service';
import { mock, MockProxy } from 'jest-mock-extended';
import { IOrderProductRepository } from '../domain/orderProduct.repository';
import { OrderFindAllOrderProductIn } from '../domain/port/orderProduct.in';
import { OrderProduct } from '../domain/orderProduct';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { OrderBuyIn } from '../domain/port/order.in';
import { OrderBuyCommand } from '../domain/order.buy.command';
import { CartBuyEvent } from '../../cart/domain/cart.buy.event';

describe('order Service test', () => {
  const orderProductRepository: MockProxy<IOrderProductRepository> = mock<IOrderProductRepository>();
  const commandBus: MockProxy<CommandBus> = mock<CommandBus>();
  const eventBus: MockProxy<EventBus> = mock<EventBus>();

  const sut = new OrderService(orderProductRepository, commandBus, eventBus);

  describe('buy 물품 구매 메소드 command 테스트', () => {
    it('command 를 성공적으로 호출한 경우', async () => {
      const givenBuyIn: OrderBuyIn = {
        address: '',
        buyProduct: [],
        buyerId: 1,
        card: {
          bankName: '테스트 은행',
          cardNumber: '1234-4555-1521-1234',
          cardType: '신용',
          method: 'CARD',
          type: 'CARD',
          validityPeriod: '04/25',
        },
      };

      commandBus.execute.mockResolvedValue({
        buyerId: 1,
        order: { code: '1241245', name: 'test', totalCost: 10000 },
        payment: {
          bankName: '테스트은행',
          cardNumber: '1234-1234',
          cardType: '체크카드',
          paymentKey: 'paymentKey',
          type: 'test',
          orderCode: 'ordercode',
          orderName: 'orderName',
          method: 'card',
          totalAmount: 10000,
          validityPeriod: '23/04/05',
          requestAt: new Date(),
        },
        buyProduct: [
          {
            code: 'test',
            cost: 10000,
            description: 'test',
            information: 'test',
            buyQuantity: 1,
            sellerId: 1,
            productId: 1,
            address: '서울시 양천구',
            mainImage: 'test',
          },
        ],
      });

      await sut.buy(givenBuyIn);

      expect(commandBus.execute).toHaveBeenCalledWith(new OrderBuyCommand(givenBuyIn));
      expect(eventBus.publish).toHaveBeenCalledWith(new CartBuyEvent(1, [1]));
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
