import { OrderService } from './order.service';
import { mock, MockProxy } from 'jest-mock-extended';
import { IOrderRepository } from '../domain/order.repository';
import { IProductRepository } from '../../product/domain/product.repository';
import { IOrderPaymentServer } from '../domain/order.payment.server';
import { OrderCard } from '../domain/orderCard';
import { OrderBuyProduct } from '../domain/orderBuyProduct';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';
import { ICartRepository } from '../../cart/domain/cart.repository';

describe('order Service test', () => {
  const orderRepository: MockProxy<IOrderRepository> = mock<IOrderRepository>();
  const productRepository: MockProxy<IProductRepository> = mock<IProductRepository>();
  const orderPaymentServer: MockProxy<IOrderPaymentServer> = mock<IOrderPaymentServer>();
  const cartRepository: MockProxy<ICartRepository> = mock<ICartRepository>();

  const sut = new OrderService(orderRepository, productRepository, orderPaymentServer, cartRepository);

  describe('buy 물품 구매 메소드 테스트', () => {
    describe('성공 케이스', () => {
      test('카드, 구매 물품을 통해 구매에 성공한 경우', async () => {
        const givenBuyerId = 1;
        const givenCard: OrderCard = {
          bankName: '테스트 은행',
          cardNumber: '1234-4555-1521-1234',
          cardType: '신용',
          method: 'CARD',
          type: 'CARD',
          validityPeriod: '04/25',
        };
        const givenAddress = '서울시 양천구';
        const givenBuyProducts: OrderBuyProduct[] = [{ productId: 1, buyQuantity: 1 }];

        productRepository.findAllById.mockResolvedValue([
          {
            id: 1,
            name: '테스트 물품',
            code: 'PRD-1234',
            description: '물품',
            information: '물품',
            quantity: 1000,
            cost: 100_000,
            isSale: true,
            sellerId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          },
        ]);
        orderPaymentServer.request.mockResolvedValue({ paymentKey: 'payment-key' });

        const result = await sut.buy({
          buyerId: givenBuyerId,
          card: givenCard,
          address: givenAddress,
          buyProduct: givenBuyProducts,
        });

        expect(result).toBeTruthy();
        expect(orderRepository.buy).toBeCalled();
        expect(cartRepository.deleteByBuy).toBeCalled();
      });
    });

    describe('실패한 경우', () => {
      test('구매하고자 하는 물품 id 가 DB에 존재하지 않을 경우', async () => {
        const givenBuyerId = 1;
        const givenCard: OrderCard = {
          bankName: '테스트 은행',
          cardNumber: '1234-4555-1521-1234',
          cardType: '신용',
          method: 'CARD',
          type: 'CARD',
          validityPeriod: '04/25',
        };
        const givenAddress = '서울시 양천구';
        const givenBuyProducts: OrderBuyProduct[] = [{ productId: 1, buyQuantity: 1 }];

        productRepository.findAllById.mockResolvedValue([]);

        await expect(async () => {
          await sut.buy({
            buyerId: givenBuyerId,
            card: givenCard,
            address: givenAddress,
            buyProduct: givenBuyProducts,
          });
        }).rejects.toThrow(new CoPangException(EXCEPTION_STATUS.PRODUCT_NOT_EXIST));
      });
    });
  });
});
