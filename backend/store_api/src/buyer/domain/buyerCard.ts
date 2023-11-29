import { Card } from './card';

export type BuyerCard = {
  id: number;
  buyerId: number;
  isRepresentative: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
} & Pick<Card, 'bankName' | 'cardType' | 'cardNumber' | 'validityPeriod'>;
