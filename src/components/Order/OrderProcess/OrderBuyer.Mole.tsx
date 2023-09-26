import { OrderBuyer } from "../../../pages/Order/OrderProcessByCart.page";
import Input from "../../Common/Atom/Input";

export default function OrderBuyerMole(buyer: OrderBuyer) {
  return (
    <div>
      <h1>주문자 정보</h1>
      <Input value={buyer.name} />
      <Input value={buyer.phoneNumber} />
      <Input value={buyer.email} />
    </div>
  );
}
