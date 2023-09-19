import Button from "../Common/Atom/Button";
import React from "react";
import { Client } from "../../context/api";
import { AxiosError } from "axios";

interface CartAddButtonProps {
  productId: number;
}
export function CartAddButton({ productId }: CartAddButtonProps) {
  const addButtonOnClickEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await Client.post("/cart/add", {
        productId,
        productQuantity: 1,
      });
      return alert("장바구니에 추가되었습니다. ");
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response!.data.errorCode === 21001) {
          return alert("이미 장바구니에 존재하는 상품입니다. ");
        }
      }
      return alert("에러가 발생했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <Button id="addToCart" onClick={addButtonOnClickEvent}>
      장바구니에 담기
    </Button>
  );
}
