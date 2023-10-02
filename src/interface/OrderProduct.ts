export type IShippingStatus = 'PAYMENT_INPROGRESS' | 'SHIPPING_READY' | 'SHIPPING' | 'SHIPPING_COMPLETE';

export interface OrderProduct {
  id: number;
  code: string;
  cost: number;
  name: string;
  description: string;
  information: string;
  buyQuantity: number;
  shippingStatus: string | IShippingStatus;
  address: string;
  sellerId: number;
  orderId: number;
  buyerId: number;
  productId: number;

  reviewId: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
