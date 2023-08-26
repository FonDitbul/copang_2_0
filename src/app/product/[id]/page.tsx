import { getProductsByServer } from "@/lib/Product";
import ProductCard from "@/components/Product/ProductCard";

export interface ProductDetailProps {
  id: number;
}

export default async function ProductDetail({
  params,
}: {
  params: ProductDetailProps;
}) {
  const productId = params.id;
  // TODO product id를 통한 product 조회
  return (
    <div>
      <ProductCard
        key={productId}
        id={productId}
        name={productId + ""}
        cost={productId}
      />
    </div>
  );
}
