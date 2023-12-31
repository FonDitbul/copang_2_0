import { Inject, Injectable } from '@nestjs/common';
import { IBuyerService } from '../domain/buyer.service';
import {
  BuyerChangeEmailIn,
  BuyerChangeNickNameIn,
  BuyerChangePasswordIn,
  BuyerChangePhoneNumberIn,
  BuyerGetAccountIn,
  BuyerLoginIn,
  BuyerSignUpIn,
} from '../domain/port/buyer.in';
import { IBuyerRepository } from '../domain/buyer.repository';
import { BuyerSignUpOut } from '../domain/port/buyer.out';
import { IPasswordEncrypt } from '../../auth/domain/password.encrypt';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';
import { ILoginToken } from '../../auth/domain/login.token';
import { Buyer } from '../domain/buyer';

@Injectable()
export class BuyerService implements IBuyerService {
  constructor(
    @Inject('IBuyerRepository') private buyerRepository: IBuyerRepository,
    @Inject('IPasswordEncrypt') private passwordEncrypt: IPasswordEncrypt,
    @Inject('ILoginToken') private loginToken: ILoginToken,
  ) {}
  async signUp(buyerSignIn: BuyerSignUpIn) {
    const password = await this.passwordEncrypt.encrypt(buyerSignIn.password);

    const buyerSignUpOut: BuyerSignUpOut = { ...buyerSignIn, password };

    const createBuyer = await this.buyerRepository.signUp(buyerSignUpOut);

    return createBuyer;
  }

  async login(loginIn: BuyerLoginIn) {
    const buyer = await this.buyerRepository.findOne({ userId: loginIn.userId });
    if (!buyer) {
      throw new CoPangException(EXCEPTION_STATUS.USER_NOT_EXIST);
    }
    if (buyer.deletedAt) {
      throw new CoPangException(EXCEPTION_STATUS.USER_DELETED);
    }

    const isCorrectPassword = await this.passwordEncrypt.compare(loginIn.password, buyer.password);

    if (!isCorrectPassword) {
      throw new CoPangException(EXCEPTION_STATUS.USER_PASSWORD_NOT_MATCH);
    }

    const oneLoginToken = this.loginToken.getOne({ id: buyer.id, userId: buyer.userId });

    return oneLoginToken;
  }

  refreshLoginByToken(refreshLoginTokenIn: string) {
    return this.loginToken.verifyByRefresh(refreshLoginTokenIn);
  }

  async checkExistUserId(userId: Buyer['userId']) {
    const existBuyer = await this.buyerRepository.findOne({ userId: userId });
    if (existBuyer) {
      return true;
    }
    return false;
  }

  async checkExistNickName(nickName: Buyer['nickName']) {
    const existBuyer = await this.buyerRepository.findOne({ nickName });
    if (existBuyer) {
      return true;
    }
    return false;
  }

  async checkExistUserEmail(email: Buyer['email']) {
    const existBuyer = await this.buyerRepository.findOne({ email: email });
    if (existBuyer) {
      return true;
    }
    return false;
  }

  async checkExistUserPhoneNumber(phoneNumber: Buyer['phoneNumber']) {
    const existBuyer = await this.buyerRepository.findOne({ phoneNumber });
    if (existBuyer) {
      return true;
    }
    return false;
  }

  async changePassword(changePasswordIn: BuyerChangePasswordIn) {
    const newPassword = changePasswordIn.password;
    const buyerId = changePasswordIn.id;

    const buyer = await this.buyerRepository.findOne({ id: buyerId });
    if (!buyer) {
      throw new CoPangException(EXCEPTION_STATUS.USER_NOT_EXIST);
    }
    if (buyer.deletedAt) {
      throw new CoPangException(EXCEPTION_STATUS.USER_DELETED);
    }

    const isSameBeforePassword = await this.passwordEncrypt.compare(newPassword, buyer.password);
    if (isSameBeforePassword) {
      throw new CoPangException(EXCEPTION_STATUS.USER_CHANGE_PASSWORD_SAME);
    }

    const newPasswordEncrypt = await this.passwordEncrypt.encrypt(newPassword);

    await this.buyerRepository.changePassword({ id: buyer.id, password: newPasswordEncrypt });
  }

  async changeNickName(changeNickNameIn: BuyerChangeNickNameIn) {
    const changedNickName = changeNickNameIn.nickName;
    const buyerId = changeNickNameIn.id;

    const buyer = await this.buyerRepository.findOne({ id: buyerId });

    if (!buyer) {
      throw new CoPangException(EXCEPTION_STATUS.USER_NOT_EXIST);
    }

    const duplicateNickNameBuyer = await this.buyerRepository.findOne({ nickName: changedNickName });
    if (duplicateNickNameBuyer) {
      throw new CoPangException(EXCEPTION_STATUS.USER_CHANGE_NICK_NAME_SAME);
    }

    const changeBuyer = await this.buyerRepository.changeNickName({ id: buyerId, nickName: changedNickName });
    return changeBuyer;
  }

  async changeEmail(changeEmailIn: BuyerChangeEmailIn) {
    const changedEmail = changeEmailIn.email;
    const buyerId = changeEmailIn.id;

    const buyer = await this.buyerRepository.findOne({ id: buyerId });

    if (!buyer) {
      throw new CoPangException(EXCEPTION_STATUS.USER_NOT_EXIST);
    }

    const duplicateEmailBuyer = await this.buyerRepository.findOne({ email: changedEmail });
    if (duplicateEmailBuyer) {
      throw new CoPangException(EXCEPTION_STATUS.USER_CHANGE_EMAIL_SAME);
    }

    const changeBuyer = await this.buyerRepository.changeEmail({ id: buyerId, email: changedEmail });
    return changeBuyer;
  }

  async changePhoneNumber(changePhoneNumber: BuyerChangePhoneNumberIn) {
    const changedPhoneNumber = changePhoneNumber.phoneNumber;
    const buyerId = changePhoneNumber.id;

    const buyer = await this.buyerRepository.findOne({ id: buyerId });

    if (!buyer) {
      throw new CoPangException(EXCEPTION_STATUS.USER_NOT_EXIST);
    }

    const duplicatePhoneNumberBuyer = await this.buyerRepository.findOne({ phoneNumber: changedPhoneNumber });
    if (duplicatePhoneNumberBuyer) {
      throw new CoPangException(EXCEPTION_STATUS.USER_CHANGE_PHONE_NUMBER_SAME);
    }

    const changeBuyer = await this.buyerRepository.changePhoneNumber({ id: buyerId, phoneNumber: changedPhoneNumber });
    return changeBuyer;
  }

  async getAccount(id: Buyer['id']): Promise<BuyerGetAccountIn> {
    const buyer = await this.buyerRepository.findOne({ id });

    if (!buyer) {
      throw new CoPangException(EXCEPTION_STATUS.USER_NOT_EXIST);
    }

    delete buyer.password;
    return buyer;
  }
}
