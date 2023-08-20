import {serverUrl} from "@/lib/api";
import {Product} from "@/interface/Product";

interface getProductsByServer {
  products: Product[]
  isEndPage: boolean
}

export async function getProductsByServer(): Promise<getProductsByServer> {
  const response = await fetch(`http://${serverUrl}/product/sale`)
  if(response.status !== 200) {
    throw new Error ('api Error')
  }
  const product = await response.json()

  return product.content
}