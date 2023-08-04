export interface Seller {
  id: number;
  userId: string;
  password: string;
  ceoName: string;
  companyName: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
