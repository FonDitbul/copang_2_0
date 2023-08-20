"use client";
import { Product } from "@/interface/Product";
import Link from "next/link";
import Image from 'next/image'
type IProductDetail = Pick<Product, "id" | "name" | "cost">;

export default function ProductCard({ id, name, cost }: IProductDetail) {
  function productBuyButton() {
    console.log("상품 구매하기 ");
  }

  function costDisplayDot(cost: number): string {
    return cost.toLocaleString("ko-KR");
  }

  function addToCartButton() {
    console.log("장바구니 추가하기");
  }

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <Link href="/products/[id]" as={`/product/${id}`}>
                <img
                  src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                  alt="사진 준비 중 "
                />
              </Link>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm">
                  <Link href="/products/[id]" as={`/product/${id}`}>
                    {name}
                  </Link>
                </h3>
              </div>
              <p className="text-sm font-medium"> {costDisplayDot(cost)}원</p>
            </div>
            <div className="flex">
              <button
                id="addToCart"
                onClick={addToCartButton}
                className="px-2 mt-6 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                장바구니에 담기
              </button>
              <button
                id="productBuy"
                onClick={productBuyButton}
                className="px-2 mt-6 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                바로 구매하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
