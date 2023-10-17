import { Cart } from '../../../interface/Cart';
import React from 'react';
import { costDisplayDot } from '../../Common/Logic/Cost.Logic';
import { calculateCost } from '../../Cart/CartCost.Logic';

type OrderProductCardProps = Cart;

export default function OrderProductCardMole(cart: OrderProductCardProps) {
  if (!cart.Product) {
    throw new Error('no product information');
  }
  return (
    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      <td className="px-6 py-3">{cart.Product.name}</td>
      <td className="px-6 py-3">{cart.productQuantity}</td>
      <td className="px-6 py-3">{costDisplayDot(cart.Product.cost)}</td>
      <td className="px-6 py-3">{costDisplayDot(calculateCost(cart.Product.cost, cart.productQuantity))}</td>
    </tr>
  );
}
