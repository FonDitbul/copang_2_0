import { Client } from '../../../context/api';
import Button from '../../Common/Atom/Button';
import { Card } from '../../../interface/BuyerCard';
import { Address } from '../../../interface/Address';
import { Cart } from '../../../interface/Cart';
import { useNavigate } from 'react-router-dom';

export type CartBuyProductType = Pick<Cart, 'productId' | 'productQuantity'>;

interface PropsType {
  card: Card;
  address: Address;
  products: CartBuyProductType[];
}

export interface BuyProductType {
  productId: number;
  buyQuantity: number;
}
interface BuyRequestType {
  card: Card;
  address: string;
  products: BuyProductType[];
}

export default function OrderBuyButtonMole({ card, address, products }: PropsType) {
  const navigate = useNavigate();

  const onClickHandler = async () => {
    const addressString = JSON.stringify(address);
    const productMapper: BuyProductType[] = products.map((product) => {
      return {
        productId: product.productId,
        buyQuantity: product.productQuantity,
      };
    });

    const requestData: BuyRequestType = {
      card: card,
      address: addressString,
      products: productMapper,
    };

    try {
      await Client.post('buyer/order/buy-product', requestData);
      alert('결제가 성공하였습니다.');
      navigate('/');
    } catch (e) {
      alert('결제가 실패하였습니다');
      console.error(e);
    }
  };
  return <Button onClick={onClickHandler}> 구매 하기</Button>;
}
