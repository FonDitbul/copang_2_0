import { Inject, Injectable } from '@nestjs/common';
import { IBuyerService } from '../domain/buyer.service';
import { BuyerChangeEmailIn, BuyerChangeNickNameIn, BuyerChangePasswordIn, BuyerLoginIn, BuyerSignUpIn } from '../domain/port/buyer.in';
import { IBuyerRepository } from '../domain/buyer.repository';
import { BuyerSignUpOut } from '../domain/port/buyer.out';
import { IPasswordEncrypt } from '../../auth/domain/password.encrypt';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';
import { ILoginToken } from '../../auth/domain/login.token';
import { formattingPhoneNumber } from '../domain/buyer';

@Injectable()
export class BuyerService implements IBuyerService {
  constructor(
    @Inject('IBuyerRepository') private buyerRepository: IBuyerRepository,
    @Inject('IPasswordEncrypt') private passwordEncrypt: IPasswordEncrypt,
    @Inject('ILoginToken') private loginToken: ILoginToken,
  ) {}
  async signUp(buyerSignIn: BuyerSignUpIn) {
    const password = await this.passwordEncrypt.encrypt(buyerSignIn.password);

    const buyerSignUpOut: BuyerSignUpOut = {
      userId: buyerSignIn.userId,
      password: formattingPhoneNumber(password),
      name: buyerSignIn.name,
      nickName: buyerSignIn.nickName,
      email: buyerSignIn.email,
      phoneNumber: buyerSignIn.phoneNumber,
    };

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

  loginByToken(loginTokenIn: string) {
    return this.loginToken.verifyByAccess(loginTokenIn);
  }

  refreshLoginByToken(refreshLoginTokenIn: string) {
    return this.loginToken.verifyByRefresh(refreshLoginTokenIn);
  }

  async checkExistUserId(userId: string) {
    const existBuyer = await this.buyerRepository.findOne({ userId: userId });
    if (existBuyer) {
      return true;
    }
    return false;
  }

  async checkExistUserEmail(email: string) {
    const existBuyer = await this.buyerRepository.findOne({ email: email });
    if (existBuyer) {
      return true;
    }
    return false;
  }

  async changePassword(changePasswordIn: BuyerChangePasswordIn) {
    const newPassword = changePasswordIn.password;
    const tokenBuyer = this.loginToken.verifyByAccess(changePasswordIn.accessToken);

    const buyer = await this.buyerRepository.findOne({ id: tokenBuyer.id });
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
    const tokenBuyer = this.loginToken.verifyByAccess(changeNickNameIn.accessToken);

    const buyer = await this.buyerRepository.findOne({ id: tokenBuyer.id });

    if (!buyer) {
      throw new CoPangException(EXCEPTION_STATUS.USER_NOT_EXIST);
    }

    const duplicateNickNameBuyer = await this.buyerRepository.findOne({ nickName: changedNickName });
    if (duplicateNickNameBuyer) {
      throw new CoPangException(EXCEPTION_STATUS.USER_CHANGE_NICK_NAME_SAME);
    }

    const changeBuyer = await this.buyerRepository.changeNickName({ id: buyer.id, nickName: changedNickName });
    return changeBuyer;
  }

  async changeEmail(changeEmailIn: BuyerChangeEmailIn) {
    const changedEmail = changeEmailIn.email;
    const tokenBuyer = this.loginToken.verifyByAccess(changeEmailIn.accessToken);

    const buyer = await this.buyerRepository.findOne({ id: tokenBuyer.id });

    if (!buyer) {
      throw new CoPangException(EXCEPTION_STATUS.USER_NOT_EXIST);
    }

    const duplicateEmailBuyer = await this.buyerRepository.findOne({ email: changedEmail });
    if (duplicateEmailBuyer) {
      throw new CoPangException(EXCEPTION_STATUS.USER_CHANGE_EMAIL_SAME);
    }

    const changeBuyer = await this.buyerRepository.changeEmail({ id: buyer.id, email: changedEmail });
    return changeBuyer;
  }
}
