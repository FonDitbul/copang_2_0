import {getProductsByServer} from "@/lib/products";

export default async function getProducts() {
  const productArray = await getProductsByServer()


  // product.content.map((product: Product) => console.log(product))
  return (
    <div>
    </div>
  )
}