import { Product } from '../../product/domain/product';
import { OrderProduct } from './orderProduct';

export type OrderBuyProduct = Pick<OrderProduct, 'productId' | 'buyQuantity'>;

export type MergeOrderProduct = Product & Pick<OrderProduct, 'buyQuantity'>;
