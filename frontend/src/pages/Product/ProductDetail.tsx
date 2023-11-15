import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Product } from '../../interface/Product';
import { Client, ResponseData } from '../../context/api';
import { CartAddButton } from '../../components/Cart/CartAddButton.Mole';
import { costDisplayDot } from '../../components/Common/Logic/Cost.Logic';
import ReviewProductOrgan from '../../components/Review/ReviewProduct.Organ';
import ReviewCreateInputModalMole from '../../components/Review/ReviewCreateInputModalMole';

interface getOneProduct {
  product: Product;
}
export default function ProductDetail() {
  const params = useParams();

  const productId: number = parseInt(params.id as string);

  const [product, setProduct] = useState({} as Product);

  useEffect(() => {
    const getOneProduct = async () => {
      const response = await Client.get(`/product?id=${productId}`);
      const responseData = response.data as ResponseData<getOneProduct>;
      const oneProduct = responseData.content.product;

      setProduct(oneProduct);
    };

    getOneProduct();
  }, []);

  return (
    <div>
      <div className="group relative block overflow-hidden">
        <img src={product.mainImage} alt="" className="transition duration-500 group-hover:scale-105" />

        <div className="relative border border-gray-100 bg-white p-6">
          {/*<span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">Hot</span>*/}

          <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>
          {/*<h3 className="mt-4 text-lg font-medium text-gray-900">{product.description}</h3>*/}
          {/*<h3 className="mt-4 text-lg font-medium text-gray-900">{product.information}</h3>*/}

          <p className="mt-1.5 text-2xl text-gray-700">{costDisplayDot(+product.cost)} 원</p>

          <CartAddButton productId={productId} />
        </div>
      </div>
      <ReviewProductOrgan productId={productId} />
    </div>
  );
}
