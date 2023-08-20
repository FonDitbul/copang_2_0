"use client";

export default function ProductDetail({ params }: { params: { id: number } }) {
  console.log(params.id)
  console.log(params)
  // TODO product id를 통한 product 조회
  return <div>productDetail 받아오기</div>;
}
