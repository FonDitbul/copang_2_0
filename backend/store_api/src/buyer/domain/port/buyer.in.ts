import { Buyer } from '../buyer';

export type BuyerIdIn = Buyer['id'];

export type BuyerUserIdIn = Buyer['userId'];

export type BuyerNickNameIn = Buyer['nickName'];

export type BuyerEmailIn = Buyer['email'];

export type BuyerPhoneNumberIn = Buyer['phoneNumber'];

export type BuyerSignUpIn = Pick<Buyer, 'userId' | 'password' | 'name' | 'nickName' | 'email' | 'phoneNumber'>;

export type BuyerLoginIn = Pick<Buyer, 'userId' | 'password'>;

export type BuyerChangePasswordIn = Pick<Buyer, 'id' | 'password'>;

export type BuyerChangeNickNameIn = Pick<Buyer, 'id' | 'nickName'>;

export type BuyerChangeEmailIn = Pick<Buyer, 'id' | 'email'>;

export type BuyerChangePhoneNumberIn = Pick<Buyer, 'id' | 'phoneNumber'>;

export type BuyerGetAccountIn = Omit<Buyer, 'password'>;
