import { Product } from '../../interface/Product';
import { Link } from 'react-router-dom';
import { costDisplayDot } from '../Common/Logic/Cost.Logic';
import { CartAddButton } from '../Cart/CartAddButton.Mole';

type IProductDetail = Pick<Product, 'id' | 'name' | 'cost' | 'mainImage'>;

export default function ProductCard({ id, name, cost, mainImage }: IProductDetail) {
  return (
    <div className="mt-4 flex flex-col mx-auto gap-6 mt-6 gap-x-6 gap-y-10">
      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Link to={`/product/${id}`}>
          <img src={mainImage} alt="사진 준비 중 " />
        </Link>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm">
            <Link to={`/product/${id}`}>{name}</Link>
          </h3>
        </div>
        <p className="text-sm font-medium"> {costDisplayDot(cost)}원</p>
      </div>
      <div className="flex">
        <CartAddButton productId={id} />
        {/*<Button id="productBuy" onClick={productBuyButton}>*/}
        {/*  바로 구매하기*/}
        {/*</Button>*/}
      </div>
    </div>
  );
}
