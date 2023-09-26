import { BuyerCard } from "../../../interface/BuyerCard";

export default function OrderBuyerCardMole({ creditCards }: { creditCards: BuyerCard[] }) {
  return (
    <div>
      <h1>결제 카드 정보</h1>
      <span>{creditCards[0].cardType}</span>{" "}
    </div>
  );
}
