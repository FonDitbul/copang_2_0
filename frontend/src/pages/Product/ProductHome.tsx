import React, { useEffect, useState } from "react";
import { Client, ResponseData } from "../../context/api";
import { Product } from "../../interface/Product";
import ProductCard from "../../components/Product/ProductCard.mole";
import Button from "../../components/Common/Atom/Button";

export interface getProductsByServer {
  products: Product[];
  isEndPage: boolean;
}

export default function ProductHome() {
  const [products, setProducts] = useState([] as Product[]);
  const [isEndPage, setIsEndPage] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getProductServer = async () => {
      const response = await Client.get(`/product/sale?page=${page}`);
      const result = response.data as ResponseData<getProductsByServer>;

      setProducts(result.content.products);
      setIsEndPage(result.content.isEndPage);
    };
    getProductServer();
  }, [page]);

  const moreButtonClickEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage(page + 1);

    const response = await Client.get(`/product/sale?page=${page}`);
    const result = response.data as ResponseData<getProductsByServer>;

    setProducts(result.content.products);
    setIsEndPage(result.content.isEndPage);
  };

  return (
    <div className="mt-6">
      <ul className="grid grid-cols-1 mx-auto gap-6 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
            <ProductCard key={product.id} id={product.id} name={product.name} cost={product.cost} />
          </li>
        ))}
      </ul>

      <div>
        <Button onClick={moreButtonClickEvent} disabled={isEndPage}>
          다음으로
        </Button>
      </div>
    </div>
  );
}
