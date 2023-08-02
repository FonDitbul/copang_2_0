export interface OrderPayment {
  id: number;
  bankName: string;
  cardNumber: string;
  cardType: string;
  validityPeriod: string;

  paymentKey: string;
  type: string;
  orderCode: string;
  orderName: string;
  method: string;
  totalAmount: number;
  status: string;
  approvedAt: Date | null;
  requestAt: Date;
  orderId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
