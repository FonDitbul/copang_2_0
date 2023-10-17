import { useEffect, useState } from 'react';
import { calculateCartCost } from '../../Cart/CartCost.Logic';
import { costDisplayDot } from '../../Common/Logic/Cost.Logic';
import { Cart } from '../../../interface/Cart';

interface cartCostProps {
  carts: Cart[];
}
export default function OrderBuyCostTotalOrgan(cartCost: cartCostProps) {
  const [carts, setCarts] = useState([] as Cart[]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalProductCost, setTotalProductCost] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    setCarts(cartCost.carts);
    const cartCostArray = carts.map((cart) => {
      return calculateCartCost(cart);
    });
    const totalCostSum = cartCostArray.reduce((prev, currentValue) => prev + currentValue, 0);

    setTotalCost(totalCostSum);

    setTotalProductCost(totalCostSum);
  }, [carts]);

  return (
    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      <h1> 결제 금액 </h1>
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">총 가격</p>
        <p className="text-gray-700">{costDisplayDot(totalCost)}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">배송비</p>
        <p className="text-gray-700">{costDisplayDot(shippingCost)}</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-gray-700 font-bold">총 결제 금액</p>
        <div className="">
          <p className="mb-1 text-gray-700 font-bold">{costDisplayDot(totalProductCost)}</p>
        </div>
      </div>
    </div>
  );
}
