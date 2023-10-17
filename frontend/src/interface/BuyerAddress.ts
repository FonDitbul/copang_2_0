export interface BuyerAddress {
  id: number;
  buyerId: number;
  address: string;
  isRepresentative: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
