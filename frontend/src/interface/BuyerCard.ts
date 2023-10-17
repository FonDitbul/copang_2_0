export interface Card {
  method: string;
  type: string;
  bankName: string;
  cardNumber: string;
  cardType: string;
  validityPeriod: string;
}

export interface BuyerCard {
  id: number;
  buyerId: number;
  isRepresentative: boolean;
  bankName: string;
  cardType: string;
  cardNumber: string;
  validityPeriod: string;
  createdAt: Date;
  updatedAt: Date;
}
