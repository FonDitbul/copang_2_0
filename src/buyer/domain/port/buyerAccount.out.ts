export interface BuyerCreateAddressOut {
  buyerId: number;
  address: string;
}

export interface BuyerCreateCardOut {
  buyerId: number;
  bankName: string;
  cardType: string;
  cardNumber: string;
  validityPeriod: string;
}
