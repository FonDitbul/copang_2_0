import { Cart } from "../../../interface/Cart";
import React from "react";
import OrderProductCardMole from "./OrderProductCard.Mole";
import { OrderBuyer } from "../../../pages/Order/OrderProcessByCart.page";

export default function OrderProductOrgan({ carts }: { carts: Cart[] }) {
  return (
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 border-2 p-6">
      <div className="rounded-lg md:w-2/3">
        <h1 className="mb-10 text-center text-2xl font-bold">주문 상품 정보</h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                이름
              </th>
              <th scope="col" className="px-6 py-3">
                수량
              </th>
              <th scope="col" className="px-6 py-3">
                가격
              </th>
              <th scope="col" className="px-6 py-3">
                총 가격
              </th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart) => (
              <OrderProductCardMole key={cart.id} {...cart} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
