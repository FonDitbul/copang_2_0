"use client";
import { Product } from "@/interface/Product";
import Link from "next/link";
import Image from "next/image";
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
    <div className="mt-4 flex flex-col mx-auto gap-6 mt-6 gap-x-6 gap-y-10">
      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Link href="/product/[id]" as={`/product/${id}`}>
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
            alt="사진 준비 중 "
          />
        </Link>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm">
            <Link href="/product/[id]" as={`/product/${id}`}>
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
  );
}

