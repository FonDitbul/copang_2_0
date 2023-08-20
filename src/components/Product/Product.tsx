import {getProductsByServer} from "@/lib/Product";
import ProductDetail from "@/components/Product/ProductDetail";
import {Product} from "@/interface/Product";
import ProductCard from "@/components/Product/ProductCard";

export default async function Product() {
  const productArray = await getProductsByServer()

  return (
    <div className="mt-6 grid grid-cols-1">
      {
        productArray.products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            cost={product.cost} />
          ))
        }
    </div>
  )
}