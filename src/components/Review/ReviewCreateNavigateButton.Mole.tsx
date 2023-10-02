import Button from "../Common/Atom/Button";
import { useNavigate } from "react-router-dom";
import React from "react";

interface Props {
  productId: number;
}

export default function ReviewCreateNavigateButtonMole({ productId }: Props) {
  const navigate = useNavigate();

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/product/${productId}`);
    return;
  };

  return <Button onClick={onClickHandler}>리뷰 작성하기</Button>;
}
