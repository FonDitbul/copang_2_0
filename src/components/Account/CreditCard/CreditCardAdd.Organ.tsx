import Input from "../../Common/Atom/Input";
import React, { useState } from "react";
import Button from "../../Common/Atom/Button";
import { Client } from "../../../context/api";

export default function CreditCardAddOrgan() {
  const [bankName, setBankName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [validityPeriod, setValidityPeriod] = useState("");

  const changeButtonClickEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await Client.post("/buyer/card/add", {
        card: {
          bankName,
          cardType,
          cardNumber,
          validityPeriod,
        },
      });
    } catch (e) {
      alert("다시 입력해 주세요");
      return;
    }

    return;
  };

  // TODO 은행 이름, 카드 타입은 선택하도록 변경

  return (
    <div>
      <div>은행 이름</div>
      <Input
        placeholder={"코팡은행"}
        onChange={(e) => {
          setBankName(e.target.value);
        }}
      />
      <div>카드 타입</div>
      <Input
        placeholder={"체크카드"}
        onChange={(e) => {
          setCardType(e.target.value);
        }}
      />
      <div>카드 번호</div>
      <Input
        placeholder={"0000-0000-0000-0000"}
        onChange={(e) => {
          setCardNumber(e.target.value);
        }}
      />
      <div>유효 기간</div>
      <Input
        placeholder={"2023/09"}
        onChange={(e) => {
          setValidityPeriod(e.target.value);
        }}
      />
      <Button onClick={changeButtonClickEvent}> 추가하기 </Button>
    </div>
  );
}
