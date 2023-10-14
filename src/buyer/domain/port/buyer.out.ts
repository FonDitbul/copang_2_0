import { Buyer } from '../buyer';

export type BuyerSignUpOut = Pick<Buyer, 'userId' | 'password' | 'name' | 'nickName' | 'email' | 'phoneNumber'>;

export type BuyerChangePasswordOut = Pick<Buyer, 'id' | 'password'>;

export type BuyerChangeNickNameOut = Pick<Buyer, 'id' | 'nickName'>;

export type BuyerChangeEmailOut = Pick<Buyer, 'id' | 'email'>;

export type BuyerChangePhoneNumberOut = Pick<Buyer, 'id' | 'phoneNumber'>;
