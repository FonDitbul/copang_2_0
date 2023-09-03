import { getProductsByServer } from "@/lib/api/Product";
import { Product } from "@/interface/Product";

type IProductDetail = Pick<Product, "id" | "name" | "cost">;

export default function ProductDetail({ id, name, cost }: IProductDetail) {
  return (
    <div>
      <p>{id}</p>
      <p>{cost}</p>
    </div>
  );
}
