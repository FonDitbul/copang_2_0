import { Cart } from "../../../interface/Cart";
import { costDisplayDot } from "../../Common/Logic/Cost.Logic";

export default function OrderProductMole({ carts }: { carts: Cart[] }) {
  return (
    <div>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          <span>주문 상품 정보</span>
          <ul>
            {carts.map((cart) => (
              <li key={cart.id}>
                {/* TODO name function , 가격, */}
                <div> {cart.Product?.name ?? "dd"}</div>
                <div> {costDisplayDot(cart.Product?.cost!)}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
