import { useEffect, useState } from 'react';
import { Client, ResponseData } from '../../context/api';
import { getCartsByServer } from '../Cart/Cart';
import { Cart } from '../../interface/Cart';
import { BuyerAddress } from '../../interface/BuyerAddress';
import { BuyerCard, Card } from '../../interface/BuyerCard';
import { CreditCardResponse } from '../Account/CreditCard/CreditCard';
import { AddressResponse } from '../Account/Address/Address.page';
import { Buyer } from '../../interface/Buyer';
import { BuyerAccountResponse } from '../Account/Info/Info';
import OrderBuyerCardMole from '../../components/Order/OrderProcess/OrderBuyerCard.Mole';
import OrderProductOrgan from '../../components/Order/OrderProcess/OrderProduct.Organ';
import OrderShippingAddressMole from '../../components/Order/OrderProcess/OrderShippingAddress.Mole';
import OrderBuyerMole from '../../components/Order/OrderProcess/OrderBuyer.Mole';
import OrderBuyButtonMole, { CartBuyProductType } from '../../components/Order/OrderProcess/OrderBuyButton.Mole';
import OrderBuyCostTotalOrgan from '../../components/Order/OrderProcess/OrderBuyCostTotal.Organ';
import { Address } from '../../interface/Address';
import Button from '../../components/Common/Atom/Button';
import { Link } from 'react-router-dom';

export type OrderBuyer = Pick<Buyer, 'name' | 'email' | 'phoneNumber'>;
export default function OrderProcessByCartPage() {
  const [buyer, setBuyer] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  } as OrderBuyer);
  const [carts, setCarts] = useState([] as Cart[]);
  const [cardArray, setCardArray] = useState([] as BuyerCard[]);
  const [addressArray, setAddressArray] = useState([] as BuyerAddress[]);

  const [buyProduct, setBuyProducts] = useState([] as CartBuyProductType[]);
  const [buyCard, setBuyCard] = useState({
    method: '',
    type: '',
    bankName: '',
    cardNumber: '',
    cardType: '',
    validityPeriod: '',
  } as Card);
  const [buyAddress, setBuyAddress] = useState({
    postalCode: '',
    address: '',
    roadAddress: '',
    jibunAddress: '',
  } as Address);

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
      const cartFilter = result.content.carts.filter((cart) => cart.status === 'ACTIVE');
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
      const response = await Client.get('/buyer/card');
      const responseData = response.data as ResponseData<CreditCardResponse>;
      const buyerCards = responseData.content.buyerCards;
      setCardArray(buyerCards);
    };

    const getAddress = async () => {
      const response = await Client.get('/buyer/address');
      const responseData = response.data as ResponseData<AddressResponse>;
      const buyerAddresses = responseData.content.buyerAddresses;
      setAddressArray(buyerAddresses);
    };
    getMyAccount();
    getCartServer();
    getCreditCard();
    getAddress();
  }, []);

  return (
    <div className="h-screen bg-dark-100 pt-20 content-center">
      <h1 className="mb-10 text-center text-2xl font-bold"> 결제하기 페이지 </h1>
      <OrderProductOrgan carts={carts} />
      <OrderBuyerMole buyer={buyer} setFunction={setBuyer} />

      {/*TODO 해당 부분은 array 가 없을시 Input 으로 받을 수 있게 변경*/}
      {addressArray.length === 0 ? (
        <Button>
          <Link to="/account/credit-card">주소 추가하러 가기</Link>
        </Button>
      ) : (
        <OrderShippingAddressMole addresses={addressArray} setFunction={setBuyAddress} />
      )}

      {cardArray.length === 0 ? (
        <Button>
          <Link to="/account/address">카드 추가하러 가기</Link>
        </Button>
      ) : (
        <OrderBuyerCardMole creditCards={cardArray} setFunction={setBuyCard} />
      )}

      <OrderBuyCostTotalOrgan carts={carts} />

      <OrderBuyButtonMole card={buyCard} address={buyAddress} products={buyProduct} />
    </div>
  );
}
