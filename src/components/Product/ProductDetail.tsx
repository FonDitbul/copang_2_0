import {getProductsByServer, Product} from "@/lib/Product";

type IProductDetail = Partial<Product>

export default function ProductDetail({id, name, cost}: IProductDetail) {

  return (
    <div>
      <p>{id}</p>
      <p>{name}</p>
      <p>{cost}</p>
    </div>
  )
}