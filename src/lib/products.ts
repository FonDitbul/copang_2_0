import {serverUrl} from "@/lib/api";

export interface Product {
  id: number;
  name: string;
  code: string;
  description: string;
  information: string;
  quantity: number;
  cost: number;
  isSale: boolean;
  sellerId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

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