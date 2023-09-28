import { useEffect, useState } from "react";
import { Client, ResponseData } from "../../context/api";
import { getCartsByServer } from "../Cart/Cart";
import { Cart } from "../../interface/Cart";
import { BuyerAddress } from "../../interface/BuyerAddress";
import { BuyerCard } from "../../interface/BuyerCard";
import { CreditCardResponse } from "../Account/CreditCard/CreditCard";
import { AddressResponse } from "../Account/Address/Address.page";
import { Buyer } from "../../interface/Buyer";
import { BuyerAccountResponse } from "../Account/Info/Info";
import OrderBuyerCardMole from "../../components/Order/OrderProcess/OrderBuyerCard.Mole";
import OrderProductMole from "../../components/Order/OrderProcess/OrderProduct.Mole";
import OrderShippingAddressMole from "../../components/Order/OrderProcess/OrderShippingAddress.Mole";
import OrderBuyerMole from "../../components/Order/OrderProcess/OrderBuyer.Mole";
import OrderBuyButtonMole from "../../components/Order/OrderProcess/OrderBuyButton.Mole";
import OrderBuyCostTotalOrgan from "../../components/Order/OrderProcess/OrderBuyCostTotal.Organ";

export type OrderBuyer = Pick<Buyer, "name" | "email" | "phoneNumber">;
export default function OrderProcessByCartPage() {
  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  } as OrderBuyer);
  const [carts, setCarts] = useState([] as Cart[]);
  const [cardArray, setCardArray] = useState([] as BuyerCard[]);
  const [addressArray, setAddressArray] = useState([] as BuyerAddress[]);

  useEffect(() => {
    const getMyAccount = async () => {
      const response = await Client.get(`/buyer`);
      const responseData = response.data as ResponseData<BuyerAccountResponse>;
      const myAccount = responseData.content;
      const { id, userId, name, nickName, email, phoneNumber, createdAt, updatedAt } = myAccount;

      setBuyer({
        name,
        email,
        phoneNumber,
      });
    };
    const getCartServer = async () => {
      const response = await Client.get(`/cart/list`);
      const result = response.data as ResponseData<getCartsByServer>;
      const cartFilter = result.content.carts.filter((cart) => cart.status === "ACTIVE");
      setCarts(cartFilter);
    };
    const getCreditCard = async () => {
      const response = await Client.get("/buyer/card");
      const responseData = response.data as ResponseData<CreditCardResponse>;
      const buyerCards = responseData.content.buyerCards;
      setCardArray(buyerCards);
    };

    const getAddress = async () => {
      const response = await Client.get("/buyer/address");
      const responseData = response.data as ResponseData<AddressResponse>;
      const buyerAddresses = responseData.content.buyerAddresses;
      setAddressArray(buyerAddresses);
    };
    getMyAccount();
    getCartServer();
    getCreditCard();
    getAddress();
  }, []);

  if (carts.length === 0) {
    return (
      <div>
        <span>구매하고자 하는 물품이 존재하지 않습니다.</span>
      </div>
    );
  }

  return (
    <div className="h-screen bg-dark-100 pt-20 content-center">
      <h1 className="mb-10 text-center text-2xl font-bold"> 결제하기 페이지 </h1>
      <OrderBuyerMole buyer={buyer} setFunction={setBuyer} />
      <OrderShippingAddressMole addresses={addressArray} />
      <OrderProductMole carts={carts} />

      {/*<OrderBuyerCardMole creditCards={cardArray} />*/}

      {/*<OrderBuyCostTotalOrgan carts={carts} />*/}
      {/**/}
      {/*<OrderBuyButtonMole />*/}
    </div>
  );
}
