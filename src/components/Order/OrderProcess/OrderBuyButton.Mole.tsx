import { Client } from "../../../context/api";
import Button from "../../Common/Atom/Button";

export default function OrderBuyButtonMole() {
  // TODO 구매하기 버튼
  // 예시
  //{
  // 	"card": {"method": "CARD", "type": "CARD", "bankName": "신한은행", "cardNumber": "1234", "cardType": "체크", "validityPeriod": "2025/04"},
  // 	"address": "서울시 양천구 신월4동",
  // 	"products": [{"productId": 2, "buyQuantity": 1}, {"productId": 3, "buyQuantity": 1}, {"productId": 1, "buyQuantity": 1}]
  // }
  const onClickHandler = () => {
    Client.post("buyer/order/buy-product", {});
  };
  return <Button onClick={onClickHandler}> 구매 하기</Button>;
}
