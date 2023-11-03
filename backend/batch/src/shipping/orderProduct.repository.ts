import { OrderProduct } from './orderProduct';

export interface OrderProductRepository {
  findAllReady(): Promise<OrderProduct[]>;
  findAllShipping(): Promise<OrderProduct[]>;
  updateToShipping(idArray: OrderProduct['id'][]): Promise<void>;
  updateToShippingComplete(idArray: OrderProduct['id'][]): Promise<void>;
}
