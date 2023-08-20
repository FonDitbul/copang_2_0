import {getProductsByServer} from "@/lib/Product";
import ProductDetail from "@/components/Product/ProductDetail";
import {Product} from "@/interface/Product";

export default async function Product() {
  const productArray = await getProductsByServer()

  return (
    <div>
      {
        productArray.products.map((product) => (
          <ProductDetail
            key={product.id}
            id={product.id}
            name={product.name}
            cost={product.cost} />
          ))
        }
    </div>
  )
}