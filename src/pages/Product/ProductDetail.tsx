import { useMatches, useParams } from "react-router-dom";

export default function ProductDetail() {
  const params = useParams();

  const productId: number = parseInt(params.id as string);

  // TODO productId 를통해 해당 product, review 등 조회 후 작성하기
  return <div>{productId}</div>;
}
