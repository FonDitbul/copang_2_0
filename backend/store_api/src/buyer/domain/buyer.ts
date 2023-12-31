import { isNotContainKeyInObject } from '@libs/utils';

export class Buyer {
  constructor(
    public id: number,
    public userId: string,
    public password: string,
    public name: string,
    public nickName: string,
    public email: string,
    public phoneNumber: string,
    public createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null,
  ) {}
}

export const formattingPhoneNumber = (phoneNumber: Buyer['phoneNumber']) => {
  return phoneNumber.trim().replace(/-/g, '').replace(/(\s*)/g, '');
};

export const isNotMatchBuyerId = <T extends { buyerId: Buyer['id'] }>(buyerAccount: T, buyerId: Buyer['id']) => {
  if (isNotContainKeyInObject(buyerAccount, 'buyerId')) {
    throw new Error('buyerId가 존재하지 않습니다.');
  }
  return buyerAccount.buyerId !== buyerId;
};
