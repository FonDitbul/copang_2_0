import { Body, Headers, Controller, Inject, Get, Post, UseInterceptors, Param, UseGuards } from '@nestjs/common';
import { BuyerChangePasswordReq, BuyerLoginReq, BuyerSignUpReq } from './buyer.req.dto';
import { TransformInterceptor } from '../../common/api/transform.interceptor';
import { IBuyerService } from '../domain/buyer.service';
import { BuyerLoginRes, BuyerSignUpRes } from './buyer.res.dto';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';

@Controller()
@UseInterceptors(TransformInterceptor)
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

  @Get('/buyer/exist-user-id/:userId')
  async checkExistId(@Param('userId') userId: string) {
    const response = this.buyerService.checkExistUserId(userId);
    return response;
  }

  @Get('/buyer/exist-user-email/:email')
  async checkExistEmail(@Param('email') email: string) {
    const response = this.buyerService.checkExistUserEmail(email);
    return response;
  }

  @Post('/buyer/change/password')
  async changePassword(@Headers('Authorization') bearerToken: string, @Body() changePasswordReq: BuyerChangePasswordReq) {
    const accessToken = bearerToken.split(' ')[1];
    const response = await this.buyerService.changePassword({ accessToken, ...changePasswordReq });

    return response;
  }
}
