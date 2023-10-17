import Button from "../Common/Atom/Button";
import {IShippingStatus, OrderProduct} from "../../interface/OrderProduct";
import {costDisplayDot} from "../Common/Logic/Cost.Logic";
import {calculateCost} from "../Cart/CartCost.Logic";
import {useState} from "react";
import ReviewCreateInputModalMole from "../Review/ReviewCreateInputModalMole";

export type IShippingStatusMessage = "결제 진행중" | "배송 대기중" | "배송중" | "배송 완료";

export default function OrderProductCard(orderProduct: OrderProduct) {
  const orderProductMap = new Map<IShippingStatus, IShippingStatusMessage>();
  orderProductMap.set("PAYMENT_INPROGRESS", "결제 진행중");
  orderProductMap.set("SHIPPING_READY", "배송 대기중");
  orderProductMap.set("SHIPPING", "배송중");
  orderProductMap.set("SHIPPING_COMPLETE", "배송 완료");

  const shippingStatus = orderProduct.shippingStatus as IShippingStatus;

  const [isCreateModal, setIsCreateModal] = useState(false);

  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img
        src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80"
        alt="product-image"
        className="w-full rounded-lg sm:w-40"
      />

      <div className="mt-5 sm:mt-0">
        <h2 className="text-lg font-bold text-gray-900">{orderProduct.name}</h2>
        <p className="mt-1 text-xs text-gray-700">{orderProduct.description}</p>
      </div>
      <div className="mt-4 justify-between">
        <div className="flex items-center space-x-4">
          <p className="text-gray-700 text-sm">
            {costDisplayDot(calculateCost(orderProduct.cost, orderProduct.buyQuantity))} 원
          </p>
        </div>
        <div>
          <p className="text-gray-700"> {orderProductMap.get(shippingStatus)} </p>
        </div>

        <div>
          {!orderProduct.reviewId && (
            <Button
              disabled={orderProduct.shippingStatus !== "SHIPPING_COMPLETE"}
              onClick={(e) => {
                setIsCreateModal(true);
              }}
            >
              리뷰 작성하기
            </Button>
          )}
        </div>

        {isCreateModal && <ReviewCreateInputModalMole orderProductId={orderProduct.id} onClose={setIsCreateModal} />}
      </div>
    </div>
  );
}
