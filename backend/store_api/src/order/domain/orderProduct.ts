import { OrderProductCreateBuyOut } from './port/order.out';
import { Order } from './order';

export type IShippingStatus = 'PAYMENT_INPROGRESS' | 'SHIPPING_READY' | 'SHIPPING' | 'SHIPPING_COMPLETE';

export interface OrderProduct {
  id: number;
  code: string;
  cost: number;
  name: string;
  description: string;
  information: string;
  buyQuantity: number;
  shippingStatus: string | IShippingStatus;
  address: string;
  mainImage: string;
  sellerId: number;
  orderId: number;
  buyerId: number;
  productId: number;

  reviewId: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export function mapperOrderProduct(product: OrderProductCreateBuyOut, buyerId: Order['buyerId'], orderId: Order['id']) {
  const { code, cost, name, description, information, buyQuantity, sellerId, productId, address, mainImage } = product;
  return {
    code,
    cost,
    name,
    description,
    information,
    buyQuantity,
    sellerId,
    productId,
    address,
    mainImage,
    buyerId,
    orderId,
  };
}
