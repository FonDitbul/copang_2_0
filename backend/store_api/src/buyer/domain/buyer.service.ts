import { Buyer } from './buyer';
import {
  BuyerChangeEmailIn,
  BuyerChangeNickNameIn,
  BuyerChangePasswordIn,
  BuyerChangePhoneNumberIn,
  BuyerGetAccountIn,
  BuyerLoginIn,
  BuyerSignUpIn,
} from './port/buyer.in';
import { OneLoginToken, UserInfo } from '../../auth/domain/login.token';

export interface IBuyerService {
  signUp: (buyerSignIn: BuyerSignUpIn) => Promise<Buyer>;
  login: (loginIn: BuyerLoginIn) => Promise<OneLoginToken>;
  loginByToken: (loginTokenIn: string) => UserInfo;
  refreshLoginByToken: (refreshLoginTokenIn: string) => OneLoginToken;
  checkExistUserId: (userId: Buyer['userId']) => Promise<boolean>;
  checkExistNickName: (nickName: Buyer['nickName']) => Promise<boolean>;
  checkExistUserEmail: (email: Buyer['email']) => Promise<boolean>;
  checkExistUserPhoneNumber: (phoneNumber: Buyer['phoneNumber']) => Promise<boolean>;
  changePassword: (changePasswordIn: BuyerChangePasswordIn) => Promise<void>;
  changeNickName: (changeNickNameIn: BuyerChangeNickNameIn) => Promise<Buyer>;
  changeEmail: (changeEmailIn: BuyerChangeEmailIn) => Promise<Buyer>;
  changePhoneNumber: (changePhoneNumberIn: BuyerChangePhoneNumberIn) => Promise<Buyer>;
  getAccount: (id: Buyer['id']) => Promise<BuyerGetAccountIn>;
}
