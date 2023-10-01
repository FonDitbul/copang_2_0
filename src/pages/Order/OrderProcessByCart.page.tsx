import { useEffect, useState } from "react";
import { Client, ResponseData } from "../../context/api";
import { getCartsByServer } from "../Cart/Cart";
import { Cart } from "../../interface/Cart";
import { BuyerAddress } from "../../interface/BuyerAddress";
import { BuyerCard, Card } from "../../interface/BuyerCard";
import { CreditCardResponse } from "../Account/CreditCard/CreditCard";
import { AddressResponse } from "../Account/Address/Address.page";
import { Buyer } from "../../interface/Buyer";
import { BuyerAccountResponse } from "../Account/Info/Info";
import OrderBuyerCardMole from "../../components/Order/OrderProcess/OrderBuyerCard.Mole";
import OrderProductOrgan from "../../components/Order/OrderProcess/OrderProduct.Organ";
import OrderShippingAddressMole from "../../components/Order/OrderProcess/OrderShippingAddress.Mole";
import OrderBuyerMole from "../../components/Order/OrderProcess/OrderBuyer.Mole";
import OrderBuyButtonMole, {
  BuyProductType,
  CartBuyProductType,
} from "../../components/Order/OrderProcess/OrderBuyButton.Mole";
import OrderBuyCostTotalOrgan from "../../components/Order/OrderProcess/OrderBuyCostTotal.Organ";
import { Address } from "../../interface/Address";

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

  const [buyProduct, setBuyProducts] = useState([] as CartBuyProductType[]);
  const [buyCard, setBuyCard] = useState({} as Card);
  const [buyAddress, setBuyAddress] = useState({} as Address);

  useEffect(() => {
    const getMyAccount = async () => {
      const response = await Client.get(`/buyer`);
      const responseData = response.data as ResponseData<BuyerAccountResponse>;
      const myAccount = responseData.content;
      const { name, email, phoneNumber } = myAccount;

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

      const buyProductMapping = cartFilter.map((product) => {
        return {
          productId: product.productId,
          productQuantity: product.productQuantity,
        } as CartBuyProductType;
      });
      setBuyProducts(buyProductMapping);
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
      <OrderProductOrgan carts={carts} />
      <OrderBuyerMole buyer={buyer} setFunction={setBuyer} />
      <OrderShippingAddressMole addresses={addressArray} setFunction={setBuyAddress} />

      <OrderBuyerCardMole creditCards={cardArray} setFunction={setBuyCard} />

      <OrderBuyCostTotalOrgan carts={carts} />

      <OrderBuyButtonMole card={buyCard} address={buyAddress} products={buyProduct} />
    </div>
  );
}
