export interface Card{
  id: number
  buyerId: number
  isRepresentative: boolean
  bankName: string
  cardType: string
  cardNumber: string
  validityPeriod: string
  createdAt: Date
  updatedAt: Date
}
