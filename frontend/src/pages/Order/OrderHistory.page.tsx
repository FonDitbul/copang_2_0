import OrderProductCard from '../../components/Order/OrderProductCard.Mole';
import React, { useEffect, useState } from 'react';
import { Client, ResponseData } from '../../context/api';
import { OrderProduct } from '../../interface/OrderProduct';
import Button from '../../components/Common/Atom/Button';

interface OrderProductResponse {
  orderProducts: OrderProduct[];
}

export default function OrderHistoryPage() {
  const [orderProductArray, setOrderProductArray] = useState([] as OrderProduct[]);
  const [orderLastId, setOrderLastId] = useState(0);

  const getOrderProduct = async (lastId: number) => {
    const response = await Client.get(`/buyer/order/product?lastId=${lastId}`);
    const responseData = response.data as ResponseData<OrderProductResponse>;
    const orderProducts = responseData.content.orderProducts;

    return orderProducts;
  };

  useEffect(() => {
    getOrderProduct(0).then((result) => {
      setOrderProductArray([...orderProductArray, ...result]);
      const orderLast = result.at(-1);
      if (orderLast) {
        setOrderLastId(orderLast.id);
      }
    });
  }, []);

  if (orderProductArray.length === 0) {
    return (
      <div>
        <span>구매한 물품 내역이 존재하지 않습니다. </span>
      </div>
    );
  }

  const moreButtonEventHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('?');
    const orderLast = orderProductArray.at(-1);
    if (orderLast && orderLast.id === orderLastId) {
      const result = await getOrderProduct(orderLastId);
      setOrderProductArray([...orderProductArray, ...result]);

      const orderLast = result.at(-1);
      if (orderLast) {
        setOrderLastId(orderLast.id);
      }
    }
    return;
  };

  return (
    <div className="items-center place-content-center">
      <h1 className="mb-10 text-center text-2xl font-bold">구매 내역 보기</h1>
      <div className="flex justify-center">
        <ul>
          {orderProductArray.map((orderProduct) => (
            <li key={orderProduct.id}>
              <OrderProductCard {...orderProduct} />
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={moreButtonEventHandler}> 더 보기 </Button>
    </div>
  );
}
