import { OrderBuyer } from '../../../pages/Order/OrderProcessByCart.page';
import Input from '../../Common/Atom/Input';
import React from 'react';

export default function OrderBuyerMole({ buyer, setFunction }: { buyer: OrderBuyer; setFunction: React.Dispatch<React.SetStateAction<OrderBuyer>> }) {
  return (
    <div className="max-w-5xl justify-between mb-6 rounded-lg p-6 shadow-md sm:justify-start border-2">
      <h1 className="mb-10 text-center text-2xl font-bold">주문자 정보</h1>
      <h2>이름</h2>
      <Input
        value={buyer.name}
        onChange={(e) => {
          setFunction({
            name: e.target.value,
            email: buyer.email,
            phoneNumber: buyer.phoneNumber,
          });
        }}
      />

      <h2>이메일</h2>
      <Input
        value={buyer.email}
        onChange={(e) => {
          setFunction({
            name: buyer.name,
            email: e.target.value,
            phoneNumber: buyer.phoneNumber,
          });
        }}
      />

      <h2>핸드폰 번호</h2>
      <Input
        value={buyer.phoneNumber}
        onChange={(e) => {
          setFunction({
            name: buyer.name,
            email: buyer.email,
            phoneNumber: e.target.value,
          });
        }}
      />
    </div>
  );
}
