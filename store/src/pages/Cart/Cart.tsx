import CartCard from "../../components/Cart/CartCard.Mole";
import CartCostTotal from "../../components/Cart/CartCostTotal.Organ";
import { Cart } from "../../interface/Cart";
import { useEffect, useState } from "react";
import { Client, ResponseData } from "../../context/api";

export interface getCartsByServer {
  carts: Cart[];
  isEndPage: boolean;
}

export default function CartPage() {
  const [carts, setCarts] = useState([] as Cart[]);
  const [isEndPage, setIsEndPage] = useState(true);

  useEffect(() => {
    const getCartServer = async () => {
      const response = await Client.get(`/cart/list`);
      const result = response.data as ResponseData<getCartsByServer>;
      setCarts(result.content.carts);
      setIsEndPage(result.content.isEndPage);
    };
    getCartServer();
  }, []);

  if (carts.length === 0) {
    return (
      <div className="h-screen bg-dark-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            <div>장바구니가 존재하지 않습니다.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-dark-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          <ul>
            {carts.map((cart) => (
              <li key={cart.id}>
                <CartCard key={cart.id} {...cart} />
              </li>
            ))}
          </ul>
        </div>
        <CartCostTotal carts={carts} />
      </div>
    </div>
  );
}
