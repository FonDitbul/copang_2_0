import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import {
  BuyerChangeEmailReq,
  BuyerChangeNickNameReq,
  BuyerChangePasswordReq,
  BuyerChangePhoneNumberReq,
  BuyerLoginReq,
  BuyerSignUpReq,
} from './buyer.req.dto';
import { IBuyerService } from '../domain/buyer.service';
import { BuyerAccountRes, BuyerLoginRes } from './buyer.res.dto';
import { AuthAuthorizationGuard } from '../../auth/api/auth.authorization.guard';
import { UserInfo } from '../../auth/domain/login.token';
import { BuyerUser } from './buyer-info.decorator';
import { phoneNumberFormattingPipe } from './buyer-phone-number.pipe';
import { Buyer } from '../domain/buyer';
import { ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FailResDto } from '../../common/api/common.res.dto';
import { AuthorizationToken } from '../../auth/api/authorizationToken.decorator';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';

@ApiTags('Buyer')
@Controller()
export class BuyerController {
  constructor(@Inject('IBuyerService') private buyerService: IBuyerService) {}

  @ApiOperation({ summary: '구매자 (유저) 회원가입', description: '유저의 정보를 입력받아 회원가입 합니다.' })
  @ApiCreatedResponse({ description: '회원가입 성공' })
  // ------------------------------------------------------------------------------------------
  @Post('/buyer/sign-up')
  async signUp(@Body() signUpReq: BuyerSignUpReq) {
    await this.buyerService.signUp(signUpReq);
    return;
  }

  @ApiOperation({ summary: '구매자 (유저) 아이디 패스워드 로그인', description: '유저의 아이디와 비밀번호를 입력하여 토큰을 발급합니다.' })
  @ApiCreatedResponse({
    type: BuyerLoginRes,
    description: '로그인 성공 access 토큰 및 refresh 토큰 발급 ',
  })
  @ApiInternalServerErrorResponse({
    type: FailResDto,
    description: '아이디 비밀번호가 일치하지 않는 경우',
  })
  // ------------------------------------------------------------------------------------------
  @Post('/buyer/login')
  async login(@Body() loginReq: BuyerLoginReq): Promise<BuyerLoginRes> {
    const response = await this.buyerService.login(loginReq);

    const loginResponse: BuyerLoginRes = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };
    return loginResponse;
  }

  @ApiOperation({ summary: '구매자 (유저) refresh 토큰 로그인', description: 'access token 이 만료되었을 경우 Refresh token 으로 새로 받아오기' })
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    type: BuyerLoginRes,
    description: '로그인 성공 access 토큰 및 refresh 토큰 발급 ',
  })
  @ApiInternalServerErrorResponse({
    type: FailResDto,
    description: 'token 값이 올바르지 않을 경우',
  })
  // ------------------------------------------------------------------------------------------
  @Get('/buyer/refresh-login')
  async refreshLoginByToken(@AuthorizationToken() token: string) {
    const response = this.buyerService.refreshLoginByToken(token);

    return response;
  }

  @ApiOperation({ summary: '구매자 (유저) 정보 가져오기', description: '유저 정보 불러오기' })
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    type: BuyerAccountRes,
    description: '유저 정보 불러오기 성공',
  })
  // ------------------------------------------------------------------------------------------
  @Get('/buyer')
  @UseGuards(AuthAuthorizationGuard)
  async account(@BuyerUser() buyer: UserInfo): Promise<BuyerAccountRes> {
    const account = await this.buyerService.getAccount(buyer.id);

    return account;
  }

  @ApiOperation({ summary: '구매자 userId 중복 검사', description: 'userId 만 입력하여 DB상에 중복 확인하기' })
  @ApiOkResponse({
    type: Boolean,
    description: 'true 중복 false 중복 X',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: '검사하고자 하는 userId 입력',
  })
  // ------------------------------------------------------------------------------------------
  @Get('/buyer/exist-user-id/:userId')
  async checkExistId(@Param('userId') userId: Buyer['userId']) {
    const response = this.buyerService.checkExistUserId(userId);
    return response;
  }

  @ApiOperation({ summary: '구매자 nickName 중복 검사', description: 'nickName 만 입력하여 DB상에 중복 확인하기' })
  @ApiOkResponse({
    type: Boolean,
    description: 'true 중복 false 중복 X',
  })
  @ApiParam({
    name: 'nickName',
    required: true,
    description: '검사하고자 하는 nickName 입력',
  })
  // ------------------------------------------------------------------------------------------
  @Get('/buyer/exist-user-nick-name/:nickName')
  async checkExistNickName(@Param('nickName') nickName: Buyer['nickName']) {
    const response = this.buyerService.checkExistNickName(nickName);
    return response;
  }

  @ApiOperation({ summary: '구매자 email 중복 검사', description: 'email 만 입력하여 DB상에 중복 확인하기' })
  @ApiOkResponse({
    type: Boolean,
    description: 'true 중복 false 중복 X',
  })
  @ApiParam({
    name: 'email',
    required: true,
    example: 'copang@copang.com',
    description: 'email 형식에 맞게 입력 필요',
  })
  // ------------------------------------------------------------------------------------------
  @Get('/buyer/exist-user-email/:email')
  async checkExistEmail(@Param('email') email: Buyer['email']) {
    const response = this.buyerService.checkExistUserEmail(email);
    return response;
  }

  @ApiOperation({ summary: '구매자 phoneNumber 중복 검사', description: 'phoneNumber 만 입력하여 DB상에 중복 확인하기' })
  @ApiOkResponse({
    type: Boolean,
    description: 'true 중복 false 중복 X',
  })
  @ApiParam({
    name: 'phoneNumber',
    required: true,
    example: '010-1234-5678',
    description: '하이픈, 띄어쓰기 무관하게 입력',
  })
  // ------------------------------------------------------------------------------------------
  @Get('/buyer/exist-user-phone-number/:phoneNumber')
  async checkExistPhoneNumber(@Param('phoneNumber', phoneNumberFormattingPipe) phoneNumber: Buyer['phoneNumber']) {
    const response = this.buyerService.checkExistUserPhoneNumber(phoneNumber);
    return response;
  }

  @ApiOperation({ summary: '구매자 비밀번호 변경', description: '비밀번호 변경 API' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: '비밀번호 변경 성공',
  })
  @ApiInternalServerErrorResponse({
    description: '이전 비밀번호와 동일할 경우 실패',
  })
  // ------------------------------------------------------------------------------------------
  @Post('/buyer/change/password')
  @UseGuards(AuthAuthorizationGuard)
  async changePassword(@BuyerUser() buyer: UserInfo, @Body() changePasswordReq: BuyerChangePasswordReq) {
    const id = buyer.id;

    return await this.buyerService.changePassword({ id, ...changePasswordReq });
  }

  @ApiOperation({ summary: '구매자 닉네임 변경', description: '닉네임 변경 API' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: '닉네임 변경 성공',
  })
  @ApiInternalServerErrorResponse({
    description: '동일한 닉네임이 존재 할 경우 실패',
  })
  // ------------------------------------------------------------------------------------------
  @Post('/buyer/change/nick-name')
  @UseGuards(AuthAuthorizationGuard)
  async changeNickName(@BuyerUser() buyer: UserInfo, @Body() nickNameReq: BuyerChangeNickNameReq) {
    const id = buyer.id;

    return await this.buyerService.changeNickName({ id, ...nickNameReq });
  }

  @ApiOperation({ summary: '이메일 닉네임 변경', description: '이메일 변경 API' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: '이메일 변경 성공',
  })
  @ApiInternalServerErrorResponse({
    description: '동일한 이메일이 존재 할 경우 실패',
  })
  // ------------------------------------------------------------------------------------------
  @Post('/buyer/change/email')
  @UseGuards(AuthAuthorizationGuard)
  async changeEmail(@BuyerUser() buyer: UserInfo, @Body() emailReq: BuyerChangeEmailReq) {
    const id = buyer.id;

    return await this.buyerService.changeEmail({ id, ...emailReq });
  }

  @ApiOperation({ summary: '구매자 핸드폰 번호 변경', description: '핸드폰 번호 변경 API' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: '핸드폰 번호 변경 성공',
  })
  @ApiInternalServerErrorResponse({
    description: '동일한 핸드폰 번호가 존재 할 경우 실패',
  })
  // ------------------------------------------------------------------------------------------
  @Post('/buyer/change/phone-number')
  @UseGuards(AuthAuthorizationGuard)
  async changePhoneNumber(@BuyerUser() buyer: UserInfo, @Body() phoneNumberReq: BuyerChangePhoneNumberReq) {
    const id = buyer.id;

    return await this.buyerService.changePhoneNumber({ id, ...phoneNumberReq });
  }
}
