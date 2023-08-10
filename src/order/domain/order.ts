import * as crypto from 'crypto';
import { MergeOrderProduct, OrderBuyProduct } from './orderBuyProduct';
import { Product } from '../../product/domain/product';

export interface Order {
  id: number;
  code: string;
  name: string;
  buyerId: number;
  status: string;
  totalCost: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export function createOrderCode() {
  return crypto.randomUUID();
}

export function createOrderName(nameArray: string[]): string {
  const copy = nameArray.slice();
  if (copy.length === 0) {
    throw new Error('0개의 배열은 만들 수 없습니다.');
  }
  if (copy.length === 1) {
    return copy.pop();
  }
  const name = `${copy[0]} 외 ${copy.length - 1}건`;
  return name;
}

export function mergeOrderProduct(productArray: Product[], willBuyProductMap: Map<number, OrderBuyProduct>) {
  const productArrayCopy = productArray.slice();
  const willBuyProductCopy = new Map(willBuyProductMap);
  const returnMap: Map<number, MergeOrderProduct> = new Map();

  productArrayCopy.forEach((product) => {
    const willBuyProduct = willBuyProductCopy.get(product.id);
    if (!willBuyProduct) {
      throw new Error('존재하지 않는 product 입니다.');
    }

    returnMap.set(product.id, { ...product, buyQuantity: willBuyProduct.buyQuantity });
  });

  return returnMap;
}

export function sumTotalCost(acc: number, product: MergeOrderProduct) {
  return acc + product.cost * product.buyQuantity;
}
