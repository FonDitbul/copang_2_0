import { getProductsByServer } from "@/lib/api/Product";
import ProductCard from "@/components/Product/ProductCard";
import { useEffect, useState } from "react";

export default async function Product() {
  const product = await getProductsByServer();

  return (
    <div className="mt-6">
      <ul className="grid grid-cols-1 mx-auto gap-6 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
        {product.products.map((product) => (
          <li key={product.id}>
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              cost={product.cost}
            />
          </li>
        ))}
      </ul>

      <div>
        <button>더보기</button>
      </div>
    </div>
  );
}
