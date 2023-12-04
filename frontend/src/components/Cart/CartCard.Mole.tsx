import Input from '../Common/Atom/Input';
import { Cart } from '../../interface/Cart';
import { costDisplayDot } from '../Common/Logic/Cost.Logic';
import { calculateCost } from './CartCost.Logic';
import { CheckBox } from '../Common/Atom/CheckBox';
import React, { useState } from 'react';
import { Client } from '../../context/api';
import CloseButton from '../Common/Atom/CloseButton';

type CartCardProps = Cart;
type CartStatus = 'ACTIVE' | 'NONE';

export default function CartCard(cart: CartCardProps) {
  const [productQuantity, setProductQuantity] = useState(cart.productQuantity);
  const [status, setStatus] = useState(cart.status as CartStatus);

  if (!cart.Product) {
    throw new Error('no product information');
  }

  const updateQuantity = (id: number, productQuantity: number, status: 'ACTIVE' | 'NONE') => {
    Client.patch('/cart', {
      id,
      productQuantity,
      status,
    });
  };

  const deleteCart = (id: number) => {
    Client.delete('/cart', {
      data: {
        id,
      },
    }).then((r) => {
      location.reload();
    });
  };

  const plusClickEvent = () => {
    const plusQuantity = productQuantity + 1;
    setProductQuantity(plusQuantity);
    updateQuantity(cart.id, plusQuantity, 'ACTIVE');
  };

  const minusClickEvent = () => {
    if (productQuantity === 1) {
      return;
    }
    const minusQuantity = productQuantity - 1;
    setProductQuantity(minusQuantity);
    updateQuantity(cart.id, minusQuantity, 'ACTIVE');
  };

  const changeProductQuantityEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const updateQuantityNum = +e.target.value;
    setProductQuantity(updateQuantityNum);
    updateQuantity(cart.id, updateQuantityNum, 'ACTIVE');
  };

  const changeProductStatusEvent = (e: React.MouseEvent<HTMLInputElement>) => {
    const updateStatus: CartStatus = status === 'ACTIVE' ? 'NONE' : 'ACTIVE';
    setStatus(updateStatus);
    updateQuantity(cart.id, productQuantity, updateStatus);
  };
  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img src={cart.Product.mainImage} alt="product-image" className="w-full rounded-lg sm:w-40" />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <CheckBox checked={status === 'ACTIVE'} onClick={changeProductStatusEvent} />
          <h2 className="text-lg font-bold text-gray-900">{cart.Product.name}</h2>
          <p className="mt-1 text-xs text-gray-700">{cart.Product.description}</p>
        </div>
        <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <span
              onClick={minusClickEvent}
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              {' '}
              -{' '}
            </span>
            <Input
              className="h-8 w-8 border text-gray-700 bg-white text-center text-xs"
              value={productQuantity}
              min="1"
              onChange={changeProductQuantityEvent}
            />
            <span
              onClick={plusClickEvent}
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              {' '}
              +{' '}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-700">{costDisplayDot(calculateCost(cart.Product.cost, productQuantity))} 원</p>
            <CloseButton onClick={(e) => deleteCart(cart.id)} />
          </div>
        </div>
      </div>
    </div>
  );
}
