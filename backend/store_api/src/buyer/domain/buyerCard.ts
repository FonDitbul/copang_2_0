import { Card } from './card';

export interface BuyerCard {
  id: number;
  buyerId: number;
  isRepresentative: boolean;
  bankName: Card['bankName'];
  cardType: Card['cardType'];
  cardNumber: Card['cardNumber'];
  validityPeriod: Card['validityPeriod'];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
