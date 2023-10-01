import { BuyerCard, Card } from "../../../interface/BuyerCard";
import React, { useEffect, useState } from "react";
import { CreditCardEditButtonMole } from "../../Account/CreditCard/CreditCardEditButton.Mole";

export default function OrderBuyerCardMole({
  creditCards,
  setFunction,
}: {
  creditCards: BuyerCard[];
  setFunction: React.Dispatch<React.SetStateAction<Card>>;
}) {
  const [creditCard, setCreditCards] = useState({} as BuyerCard);

  useEffect(() => {
    let representativeCreditCards = creditCards.find((card) => card.isRepresentative);
    if (!representativeCreditCards) {
      representativeCreditCards = creditCards[0];
    }
    setCreditCards(representativeCreditCards);

    setFunction({
      method: "CARD",
      type: "CARD",
      bankName: representativeCreditCards.bankName,
      cardType: representativeCreditCards.cardType,
      cardNumber: representativeCreditCards.cardNumber,
      validityPeriod: representativeCreditCards.validityPeriod,
    } as Card);
  }, []);

  if (creditCards.length === 0) {
    return (
      <div>
        <span> 구매 카드가 존재하지 않습니다. </span>
        <CreditCardEditButtonMole />
      </div>
    );
  }

  return (
    <div className="max-w-5xl justify-between mb-6 rounded-lg p-6 shadow-md sm:justify-start border-2">
      <h1 className="mb-10 text-center text-2xl font-bold">결제 카드 정보</h1>
      <div className="">
        <p className="font-light">은행이름</p>
        <p className="font-medium tracking-widest">{creditCard.bankName}</p>
        <div className="pt-1">
          <p className="font-light">Card Number</p>
          <p className="font-medium tracking-more-wider">{creditCard.cardNumber}</p>
        </div>
        <div className="pt-1">
          <p className="font-light">카드 타입 </p>
          <p className="font-medium tracking-more-wider">{creditCard.cardType}</p>
        </div>
        <div className="pt-6 pr-6">
          <div className="flex justify-between">
            <div className="">
              <p className="font-light text-xs">유효 기간</p>
              <p className="font-medium tracking-wider text-sm">{creditCard.validityPeriod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
