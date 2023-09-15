import { useEffect, useState } from "react";
import { Client, ResponseData, serverUrl } from "../../context/api";
import axios from "axios";
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

  useEffect(() => {
    const getProductServer = async () => {
      const response = await Client.get("/product/sale");
      const result = response.data as ResponseData<getProductsByServer>;

      setProducts(result.content.products);
      setIsEndPage(result.content.isEndPage);
    };
    getProductServer();
  }, []);

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

      <div>{!isEndPage && <Button onClick={() => console.log("더보기 클릭")}>더보기</Button>}</div>
    </div>
  );
}
