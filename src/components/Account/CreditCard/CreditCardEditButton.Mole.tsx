import Button from "../../Common/Atom/Button";
import { useNavigate } from "react-router-dom";
import React from "react";

export function CreditCardEditButtonMole() {
  const navigate = useNavigate();

  const buttonOnclick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/account/credit-card");
    return;
  };

  return <Button onClick={buttonOnclick}>카드 편집하기</Button>;
}
