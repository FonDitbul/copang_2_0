import { Card } from '../../buyer/domain/card';

export type OrderCard = Card & {
  method: string;
  type: string;
};
