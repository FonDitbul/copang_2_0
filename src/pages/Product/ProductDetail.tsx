import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Product } from "../../interface/Product";
import { Client, ResponseData } from "../../context/api";
import { CartAddButton } from "../../components/Cart/CartAddButton.Mole";
import { costDisplayDot } from "../../components/Common/Logic/Cost.Logic";

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
        <img
          src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
          alt=""
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />

        <div className="relative border border-gray-100 bg-white p-6">
          {/*<span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">Hot</span>*/}

          <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>
          <h3 className="mt-4 text-lg font-medium text-gray-900">{product.description}</h3>
          <h3 className="mt-4 text-lg font-medium text-gray-900">{product.information}</h3>

          <p className="mt-1.5 text-sm text-gray-700">{costDisplayDot(product.cost)} 원</p>

          <CartAddButton productId={productId} />
        </div>
      </div>
      {/*<span>{productId}</span>*/}
      {/*<span>{product.name}</span>*/}
      {/*<span>{product.description}</span>*/}
      {/*<span>{product.information}</span>*/}
      {/*<span>{product.quantity}</span>*/}

      {/*<CartAddButton productId={productId} />*/}
      {/*<span> 리뷰 현황 </span>*/}
      {/*<Input placeholder="내 리뷰" />*/}
      {/*<ul>*/}
      {/*  {reviewArray.length !== 0 &&*/}
      {/*    reviewArray.map((review) => (*/}
      {/*      <li key={review.id}>*/}
      {/*        {review.content}*/}
      {/*        {review.star}*/}
      {/*      </li>*/}
      {/*    ))}*/}
      {/*</ul>*/}
    </div>
  );
}
