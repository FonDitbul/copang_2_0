import { Buyer } from './buyer';
import {
  BuyerChangeEmailIn,
  BuyerChangeNickNameIn,
  BuyerChangePasswordIn,
  BuyerChangePhoneNumberIn,
  BuyerEmailIn,
  BuyerGetAccountIn,
  BuyerIdIn,
  BuyerLoginIn,
  BuyerNickNameIn,
  BuyerPhoneNumberIn,
  BuyerSignUpIn,
  BuyerUserIdIn,
} from './port/buyer.in';
import { OneLoginToken } from '../../auth/domain/login.token';

export interface IBuyerService {
  signUp: (buyerSignIn: BuyerSignUpIn) => Promise<Buyer>;
  login: (loginIn: BuyerLoginIn) => Promise<OneLoginToken>;
  refreshLoginByToken: (refreshLoginTokenIn: string) => OneLoginToken;
  checkExistUserId: (userId: BuyerUserIdIn) => Promise<boolean>;
  checkExistNickName: (nickName: BuyerNickNameIn) => Promise<boolean>;
  checkExistUserEmail: (email: BuyerEmailIn) => Promise<boolean>;
  checkExistUserPhoneNumber: (phoneNumber: BuyerPhoneNumberIn) => Promise<boolean>;
  changePassword: (changePasswordIn: BuyerChangePasswordIn) => Promise<void>;
  changeNickName: (changeNickNameIn: BuyerChangeNickNameIn) => Promise<Buyer>;
  changeEmail: (changeEmailIn: BuyerChangeEmailIn) => Promise<Buyer>;
  changePhoneNumber: (changePhoneNumberIn: BuyerChangePhoneNumberIn) => Promise<Buyer>;
  getAccount: (id: BuyerIdIn) => Promise<BuyerGetAccountIn>;
}
