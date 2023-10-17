import { Body, Controller, Get, Headers, Inject, Param, Post, UseGuards } from '@nestjs/common';
import {
  BuyerChangeEmailReq,
  BuyerChangeNickNameReq,
  BuyerChangePasswordReq,
  BuyerChangePhoneNumberReq,
  BuyerLoginReq,
  BuyerSignUpReq,
} from './buyer.req.dto';
import { IBuyerService } from '../domain/buyer.service';
import { BuyerLoginRes, BuyerSignUpRes } from './buyer.res.dto';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';
import { UserInfo } from '../../auth/domain/login.token';
import { BuyerUser } from './buyer-info.decorator';
import { phoneNumberFormattingPipe } from './buyer-phone-number.pipe';
import { Buyer } from '../domain/buyer';

@Controller()
export class BuyerController {
  constructor(@Inject('IBuyerService') private buyerService: IBuyerService) {}

  @Post('/buyer/sign-up')
  async signUp(@Body() signUpReq: BuyerSignUpReq) {
    const response = await this.buyerService.signUp(signUpReq);

    const signUpResponse: BuyerSignUpRes = {
      id: response.id,
      userId: response.userId,
      nickName: response.nickName,
      email: response.email,
      phoneNumber: response.phoneNumber,
      deletedAt: response.deletedAt,
    };
    return signUpResponse;
  }

  @Post('/buyer/login')
  async login(@Body() loginReq: BuyerLoginReq) {
    const response = await this.buyerService.login(loginReq);

    const loginResponse: BuyerLoginRes = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };
    return loginResponse;
  }

  @Get('/buyer/login')
  async loginByToken(@Headers('Authorization') bearerToken: string) {
    const jwtToken = bearerToken.split(' ')[1];

    const response = this.buyerService.loginByToken(jwtToken);

    return response;
  }

  @Get('/buyer/refresh-login')
  async refreshLoginByToken(@Headers('Authorization') bearerToken: string) {
    const jwtToken = bearerToken.split(' ')[1];

    const response = this.buyerService.refreshLoginByToken(jwtToken);

    return response;
  }

  @Get('/buyer')
  @UseGuards(AuthAuthorizationGuard)
  async account(@BuyerUser() buyer: UserInfo) {
    const account = await this.buyerService.getAccount(buyer.id);

    return account;
  }

  @Get('/buyer/exist-user-id/:userId')
  async checkExistId(@Param('userId') userId: Buyer['userId']) {
    const response = this.buyerService.checkExistUserId(userId);
    return response;
  }

  @Get('/buyer/exist-user-nick-name/:nickName')
  async checkExistNickName(@Param('nickName') nickName: Buyer['nickName']) {
    const response = this.buyerService.checkExistNickName(nickName);
    return response;
  }

  @Get('/buyer/exist-user-email/:email')
  async checkExistEmail(@Param('email') email: Buyer['email']) {
    const response = this.buyerService.checkExistUserEmail(email);
    return response;
  }

  @Get('/buyer/exist-user-phone-number/:phoneNumber')
  async checkExistPhoneNumber(@Param('phoneNumber', phoneNumberFormattingPipe) phoneNumber: Buyer['phoneNumber']) {
    const response = this.buyerService.checkExistUserPhoneNumber(phoneNumber);
    return response;
  }

  @Post('/buyer/change/password')
  @UseGuards(AuthAuthorizationGuard)
  async changePassword(@BuyerUser() buyer: UserInfo, @Body() changePasswordReq: BuyerChangePasswordReq) {
    const id = buyer.id;

    return await this.buyerService.changePassword({ id, ...changePasswordReq });
  }

  @Post('/buyer/change/nick-name')
  @UseGuards(AuthAuthorizationGuard)
  async changeNickName(@BuyerUser() buyer: UserInfo, @Body() nickNameReq: BuyerChangeNickNameReq) {
    const id = buyer.id;

    return await this.buyerService.changeNickName({ id, ...nickNameReq });
  }

  @Post('/buyer/change/email')
  @UseGuards(AuthAuthorizationGuard)
  async changeEmail(@BuyerUser() buyer: UserInfo, @Body() emailReq: BuyerChangeEmailReq) {
    const id = buyer.id;

    return await this.buyerService.changeEmail({ id, ...emailReq });
  }

  @Post('/buyer/change/phone-number')
  @UseGuards(AuthAuthorizationGuard)
  async changePhoneNumber(@BuyerUser() buyer: UserInfo, @Body() phoneNumberReq: BuyerChangePhoneNumberReq) {
    const id = buyer.id;

    return await this.buyerService.changePhoneNumber({ id, ...phoneNumberReq });
  }
}
