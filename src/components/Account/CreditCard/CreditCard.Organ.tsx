import { BuyerCard } from "../../../interface/BuyerCard";
import StarAtom from "../../Common/Atom/Star";
import CreditCardRepresentativeStar from "./CreditCardRepresentativeButton.Mole";

type CreditCardProps = BuyerCard;

export function CreditCard(card: CreditCardProps) {
  let star = <StarAtom isFull={card.isRepresentative} />;
  if (!card.isRepresentative) {
    star = <CreditCardRepresentativeStar id={card.id} />;
  }
  // TODO 하나의 CreditCard
  // 대표로 설정하기, 삭제하기
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="space-y-16">
        <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
          <img className="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png" />

          <div className="w-full px-8 absolute top-8">
            <div className="">
              <p className="font-light">은행이름</p>
              <p className="font-medium tracking-widest">{card.bankName}</p>
              <div className="pt-1">
                <p className="font-light">Card Number</p>
                <p className="font-medium tracking-more-wider">{card.cardNumber}</p>
              </div>
              <div className="pt-1">
                <p className="font-light">카드 타입 </p>
                <p className="font-medium tracking-more-wider">{card.cardType}</p>
              </div>
              <div className="pt-6 pr-6">
                <div className="flex justify-between">
                  <div className="">
                    <p className="font-light text-xs">유효 기간</p>
                    <p className="font-medium tracking-wider text-sm">{card.validityPeriod}</p>
                  </div>
                </div>
                {star}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
