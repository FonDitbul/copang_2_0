import { useEffect, useState } from "react";
import { Client, ResponseData } from "../../../context/api";
import { BuyerCard } from "../../../interface/BuyerCard";
import { CreditCard } from "../../../components/Account/CreditCard/CreditCard.Organ";
import Button from "../../../components/Common/Atom/Button";
import CreditCardAddButton from "../../../components/Account/CreditCard/CreditCardAddButon.Mole";

export type CreditCardResponse = {
  buyerCards: BuyerCard[];
};

export default function AccountCreditCardPage() {
  const [cardArray, setCardArray] = useState([] as BuyerCard[]);
  useEffect(() => {
    const getCreditCard = async () => {
      const response = await Client.get("/buyer/card");
      const responseData = response.data as ResponseData<CreditCardResponse>;
      const buyerCards = responseData.content.buyerCards;
      setCardArray(buyerCards);
    };
    getCreditCard();
  }, []);

  if (cardArray.length === 0) {
    return (
      <div>
        {" "}
        현재 결제 카드가 존재하지 않습니다.
        <CreditCardAddButton />
      </div>
    );
  }

  // TODO 가로 스크롤로 볼 수 있게 변경
  return (
    <div>
      {cardArray.map((card) => {
        return <CreditCard key={card.id} {...card} />;
      })}
      <CreditCardAddButton />
    </div>
  );
}
