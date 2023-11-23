import { BuyerService } from './buyer.service';
import { IBuyerService } from '../domain/buyer.service';
import { IPasswordEncrypt } from '../../auth/domain/password.encrypt';
import { IBuyerRepository } from '../domain/buyer.repository';
import { Buyer } from '../domain/buyer';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { ILoginToken, OneLoginToken, UserInfo } from '../../auth/domain/login.token';
import { BuyerLoginIn } from '../domain/port/buyer.in';
import { CoPangException, EXCEPTION_STATUS } from '../../common/domain/exception';

describe('Buyer Service test  ', () => {
  const buyerRepository: MockProxy<IBuyerRepository> = mock<IBuyerRepository>();
  const passwordEncrypt: MockProxy<IPasswordEncrypt> = mock<IPasswordEncrypt>();
  const loginToken: MockProxy<ILoginToken> = mock<ILoginToken>();
  const sut: IBuyerService = new BuyerService(buyerRepository, passwordEncrypt, loginToken); // System Under Test

  // test password And password Encrypt
  const testPassword = 'copang1234!';
  const testEncryptPassword = '$2b$08$4JWdHG8SyP2kI1CusmpYr.zSI7QxWK7k.gl26D.i4IHHANVzqmkHa';

  // mock clear
  beforeEach(() => {
    mockReset(buyerRepository);
    mockReset(passwordEncrypt);
    mockReset(loginToken);
  });

  describe('구매자 회원가입 테스트', () => {
    test('구매자의 회원가입이 phoneNumber 가 표현식에 맞게 표현되며 암호화가 정상적으로 수행되어 성공한 사례', async () => {
      const givenBuyer: Buyer = {
        id: 1,
        userId: 'copang',
        password: testEncryptPassword,
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@naver.com',
        phoneNumber: '01012345678',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      const willSignUpBuyer = {
        userId: 'copang',
        password: 'copang1234!',
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@naver.com',
        phoneNumber: '010-1234-5678',
      };
      passwordEncrypt.encrypt.calledWith(willSignUpBuyer.password).mockResolvedValue(testEncryptPassword);
      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'signUp').mockResolvedValue(givenBuyer);

      const result = await sut.signUp(willSignUpBuyer);

      expect(passwordEncrypt.encrypt).toHaveBeenCalledWith(willSignUpBuyer.password);
      expect(buyerRepositorySpy).toHaveBeenCalledWith({ ...willSignUpBuyer, password: testEncryptPassword });
      expect(result.phoneNumber).toEqual(expect.not.stringContaining(' '));
      expect(result.phoneNumber).toEqual(expect.not.stringContaining('-'));
    });
  });

  describe('구매자 아이디 패스워드로 토큰을 받아오는 로그인 테스트', () => {
    test('구매자의 아이디, 비밀번호로 로그인 성공 ', async () => {
      const givenBuyer: Buyer = {
        id: 1,
        userId: 'copang',
        password: testEncryptPassword,
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@naver.com',
        phoneNumber: '01012345678',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const givenToken: OneLoginToken = {
        accessToken: {
          value: 'accessToken',
          expiredAt: new Date(),
        },
        refreshToken: {
          value: 'refreshToken',
          expiredAt: new Date(),
        },
      };

      const willLoginBuyer: BuyerLoginIn = {
        userId: 'copang',
        password: testPassword,
      };

      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(givenBuyer);
      passwordEncrypt.compare.calledWith(willLoginBuyer.password, givenBuyer.password).mockResolvedValue(true);
      const loginTokenSpy = jest.spyOn(loginToken, 'getOne').mockReturnValue(givenToken);

      const result = await sut.login(willLoginBuyer);

      expect(buyerRepositorySpy).toHaveBeenCalled();
      expect(passwordEncrypt.compare).toHaveBeenCalledWith(willLoginBuyer.password, givenBuyer.password);
      expect(loginTokenSpy).toHaveBeenCalled();
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });

    test('구매자가 탈퇴된 계정으로 로그인 시도를 하여 실패한 경우', async () => {
      const givenBuyerDeleted: Buyer = {
        id: 1,
        userId: 'copang',
        password: testEncryptPassword,
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@naver.com',
        phoneNumber: '01012345678',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };

      const willLoginBuyer: BuyerLoginIn = {
        userId: 'copang',
        password: testPassword,
      };
      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(givenBuyerDeleted);

      await expect(async () => await sut.login(willLoginBuyer)).rejects.toThrow(new CoPangException(EXCEPTION_STATUS.USER_DELETED));
      expect(buyerRepositorySpy).toHaveBeenCalled();
      expect(passwordEncrypt.compare).not.toHaveBeenCalled();
      expect(loginToken.getOne).not.toHaveBeenCalled();
    });

    test('입력된 구매자의 아이디가 존재하지 않아 실패한 경우', async () => {
      const givenBuyerNotExist = null;

      const willLoginBuyer: BuyerLoginIn = {
        userId: 'copang',
        password: testPassword,
      };
      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(givenBuyerNotExist);

      await expect(async () => await sut.login(willLoginBuyer)).rejects.toThrow(new CoPangException(EXCEPTION_STATUS.USER_NOT_EXIST));
      expect(buyerRepositorySpy).toHaveBeenCalled();
      expect(passwordEncrypt.compare).not.toHaveBeenCalled();
      expect(loginToken.getOne).not.toHaveBeenCalled();
    });

    test('구매자의 아이디, 비밀번호중 비밀번호가 일치하지 않아 실패 한 경우', async () => {
      const givenBuyer: Buyer = {
        id: 1,
        userId: 'copang',
        password: testEncryptPassword,
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@naver.com',
        phoneNumber: '01012345678',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const willLoginBuyer: BuyerLoginIn = {
        userId: 'copang',
        password: testPassword,
      };

      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(givenBuyer);
      passwordEncrypt.compare.calledWith(willLoginBuyer.password, givenBuyer.password).mockResolvedValue(false);

      await expect(async () => await sut.login(willLoginBuyer)).rejects.toThrow(new CoPangException(EXCEPTION_STATUS.USER_PASSWORD_NOT_MATCH));
      expect(buyerRepositorySpy).toHaveBeenCalled();
      expect(passwordEncrypt.compare).toHaveBeenCalledWith(willLoginBuyer.password, givenBuyer.password);
      expect(loginToken.getOne).not.toHaveBeenCalled();
    });
  });

  describe('구매자 리프래쉬 토큰 리프래쉬 로그인 테스트', () => {
    test('구매자가 올바른 refresh 토큰을 이용하여 새 토큰 정보 받아오기를 성공한 경우', () => {
      const givenTokenIn = 'success_token';

      const givenToken: OneLoginToken = {
        accessToken: {
          value: 'accessToken',
          expiredAt: new Date(),
        },
        refreshToken: {
          value: 'refreshToken',
          expiredAt: new Date(),
        },
      };

      loginToken.verifyByRefresh.calledWith(givenTokenIn).mockReturnValue(givenToken);

      const result = sut.refreshLoginByToken(givenTokenIn);

      expect(result).toEqual(givenToken);
      expect(loginToken.verifyByRefresh).toHaveBeenCalledWith(givenTokenIn);
    });

    test('구매자가 올바르지 않은 토큰을 이용하여 유저 정보 반환에 실패한 경우', () => {
      const givenTokenIn = 'failed_token';

      loginToken.verifyByRefresh.calledWith(givenTokenIn).mockImplementation(() => {
        throw new CoPangException(EXCEPTION_STATUS.LOGIN_TOKEN_ERROR);
      });

      expect(() => sut.refreshLoginByToken(givenTokenIn)).toThrow(new CoPangException(EXCEPTION_STATUS.LOGIN_TOKEN_ERROR));
    });
  });

  describe('구매자 userId가 이미 존재하는 지 확인하는 기능 테스트', () => {
    test('구매자의 userId를 사용하는 유저가 존재 경우', async () => {
      const userId = 'copang';
      const givenBuyer: Buyer = {
        id: 1,
        userId: 'copang',
        password: testEncryptPassword,
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@naver.com',
        phoneNumber: '01012345678',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(givenBuyer);

      const result = await sut.checkExistUserId(userId);

      expect(result).toEqual(true);
      expect(buyerRepositorySpy).toHaveBeenCalled();
    });

    test('구매자의 userId를 사용하는 유저가 존재하지 않는 경우', async () => {
      const userId = 'copang';

      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(null);

      const result = await sut.checkExistUserId(userId);

      expect(result).toEqual(false);
      expect(buyerRepositorySpy).toHaveBeenCalled();
    });
  });

  describe('구매자 nickName 가 이미 존재하는 지 확인하는 기능 테스트', () => {
    test('구매자의 nickName 을 사용하는 유저가 존재 경우', async () => {
      const nickName = '코팡구매자';
      const givenBuyer: Buyer = {
        id: 1,
        userId: 'copang',
        password: testEncryptPassword,
        name: '코팡맨',
        nickName: '코팡구매자',
        email: 'copang@naver.com',
        phoneNumber: '01012345678',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(givenBuyer);

      const result = await sut.checkExistNickName(nickName);

      expect(result).toEqual(true);
      expect(buyerRepositorySpy).toHaveBeenCalledWith({ nickName: nickName });
    });

    test('구매자의 nickName 을 사용하는 유저가 존재하지 않는 경우', async () => {
      const nickName = '코팡구매자';

      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(null);

      const result = await sut.checkExistNickName(nickName);

      expect(result).toEqual(false);
      expect(buyerRepositorySpy).toHaveBeenCalledWith({ nickName: nickName });
    });
  });

  describe('구매자 email가 이미 존재하는 지 확인하는 기능 테스트', () => {
    test('구매자의 email를 사용하는 유저가 존재 경우', async () => {
      const email = 'copang@copang.com';
      const givenBuyer: Buyer = {
        id: 1,
        userId: 'copang',
        password: testEncryptPassword,
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@copang.com',
        phoneNumber: '01012345678',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(givenBuyer);

      const result = await sut.checkExistUserEmail(email);

      expect(result).toEqual(true);
      expect(buyerRepositorySpy).toHaveBeenCalled();
    });

    test('구매자의 email를 사용하는 유저가 존재하지 않는 경우', async () => {
      const email = 'copang';

      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(null);

      const result = await sut.checkExistUserEmail(email);

      expect(result).toEqual(false);
      expect(buyerRepositorySpy).toHaveBeenCalled();
    });
  });

  describe('구매자 핸드폰 번호가 이미 존재하는 지 확인하는 기능 테스트', () => {
    test('구매자의 핸드폰 번호를 사용하는 유저가 존재 경우', async () => {
      const phoneNumber = '01012345678';
      const givenBuyer: Buyer = {
        id: 1,
        userId: 'copang',
        password: testEncryptPassword,
        name: '코팡맨',
        nickName: '코팡구매',
        email: 'copang@copang.com',
        phoneNumber: '01012345678',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(givenBuyer);

      const result = await sut.checkExistUserPhoneNumber(phoneNumber);

      expect(result).toEqual(true);
      expect(buyerRepositorySpy).toHaveBeenCalled();
    });

    test('구매자의 핸드폰번호를 사용하는 유저가 존재하지 않는 경우', async () => {
      const phoneNumber = '01012345678';

      const buyerRepositorySpy = jest.spyOn(buyerRepository, 'findOne').mockResolvedValue(null);

      const result = await sut.checkExistUserPhoneNumber(phoneNumber);

      expect(result).toEqual(false);
      expect(buyerRepositorySpy).toHaveBeenCalled();
    });
  });

  describe('구매자 비밀번호 변경 기능 테스트 ', () => {
    describe('성공 케이스', () => {
      test('비밀번호 변경이 성공한 케이스', async () => {
        const id = 1;
        const password = 'copang1234!';

        const givenBuyer: Buyer = {
          id: 1,
          userId: 'copang',
          password: testEncryptPassword,
          name: '코팡맨',
          nickName: '코팡구매',
          email: 'copang@copang.com',
          phoneNumber: '01012345678',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };

        buyerRepository.findOne.mockResolvedValue(givenBuyer);
        passwordEncrypt.compare.mockResolvedValue(false);
        passwordEncrypt.encrypt.mockResolvedValue('password1234');
        const buyerRepositoryChangePasswordSpy = jest.spyOn(buyerRepository, 'changePassword').mockResolvedValue(givenBuyer);

        const result = await sut.changePassword({ id, password });

        expect(buyerRepositoryChangePasswordSpy).toHaveBeenCalled();
      });
    });

    describe('실패 케이스', () => {
      test('해당하는 id의 buyer 정보가 DB에 존재하지 않은 경우', async () => {
        const id = 1;
        const password = 'copang1234!';

        const givenUserInfo: UserInfo = {
          id: 1,
          userId: 'copang',
        };

        loginToken.verifyByAccess.mockReturnValue(givenUserInfo);
        buyerRepository.findOne.mockResolvedValue(null);
        passwordEncrypt.compare.mockResolvedValue(true);
        passwordEncrypt.encrypt.mockResolvedValue('password1234');

        await expect(async () => await sut.changePassword({ id, password })).rejects.toThrow(new CoPangException(EXCEPTION_STATUS.USER_NOT_EXIST));
      });

      test('해당하는 id의 buyer가 삭제된 유저인 경우', async () => {
        const id = 1;
        const password = 'copang1234!';

        const givenUserInfo: UserInfo = {
          id: 1,
          userId: 'copang',
        };

        const givenBuyer: Buyer = {
          id: 1,
          userId: 'copang',
          password: testEncryptPassword,
          name: '코팡맨',
          nickName: '코팡구매',
          email: 'copang@copang.com',
          phoneNumber: '01012345678',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date(),
        };

        loginToken.verifyByAccess.mockReturnValue(givenUserInfo);
        buyerRepository.findOne.mockResolvedValue(givenBuyer);
        passwordEncrypt.compare.mockResolvedValue(true);
        passwordEncrypt.encrypt.mockResolvedValue('password1234');

        await expect(async () => await sut.changePassword({ id, password })).rejects.toThrow(new CoPangException(EXCEPTION_STATUS.USER_DELETED));
      });

      test('변경하고자 하는 비밀번호가 이전 비밀번호와 동일한 경우', async () => {
        const id = 1;
        const password = 'copang1234!';

        const givenUserInfo: UserInfo = {
          id: 1,
          userId: 'copang',
        };

        const givenBuyer: Buyer = {
          id: 1,
          userId: 'copang',
          password: testEncryptPassword,
          name: '코팡맨',
          nickName: '코팡구매',
          email: 'copang@copang.com',
          phoneNumber: '01012345678',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };

        loginToken.verifyByAccess.mockReturnValue(givenUserInfo);
        buyerRepository.findOne.mockResolvedValue(givenBuyer);
        passwordEncrypt.compare.mockResolvedValue(true);
        passwordEncrypt.encrypt.mockResolvedValue('password1234');

        await expect(async () => await sut.changePassword({ id, password })).rejects.toThrow(
          new CoPangException(EXCEPTION_STATUS.USER_CHANGE_PASSWORD_SAME),
        );
      });
    });
  });

  describe('구매자 닉네임 변경 기능 테스트 ', () => {
    describe('성공 케이스', () => {
      test('닉네임 변경이 성공한 케이스', async () => {
        const id = 1;
        const nickName = '코팡맨';

        const givenUserInfo: UserInfo = {
          id: 1,
          userId: 'copang',
        };

        const givenBuyer: Buyer = {
          id: 1,
          userId: 'copang',
          password: testEncryptPassword,
          name: '코팡맨',
          nickName: '변경전코팡구매',
          email: 'copang@copang.com',
          phoneNumber: '01012345678',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };

        loginToken.verifyByAccess.mockReturnValue(givenUserInfo);
        buyerRepository.findOne.mockResolvedValueOnce(givenBuyer).mockResolvedValueOnce(null);

        const buyerRepositoryChangeNickNameSpy = jest.spyOn(buyerRepository, 'changeNickName').mockResolvedValue(givenBuyer);

        const result = await sut.changeNickName({ id, nickName });

        expect(buyerRepositoryChangeNickNameSpy).toHaveBeenCalled();
      });
    });

    describe('실패 케이스', () => {
      test('해당하는 id의 buyer 정보가 DB에 존재하지 않은 경우', async () => {
        const id = 1;
        const nickName = 'copang1234!';

        const givenUserInfo: UserInfo = {
          id: 1,
          userId: 'copang',
        };

        loginToken.verifyByAccess.mockReturnValue(givenUserInfo);
        buyerRepository.findOne.mockResolvedValue(null);

        await expect(async () => await sut.changeNickName({ id, nickName })).rejects.toThrow(new CoPangException(EXCEPTION_STATUS.USER_NOT_EXIST));
      });

      test('변경하고자 하는 닉네임이 이미 사용하는 닉네임일 경우', async () => {
        const id = 1;
        const nickName = '동일한닉네임';

        const givenUserInfo: UserInfo = {
          id: 1,
          userId: 'copang',
        };

        const givenBuyer: Buyer = {
          id: 1,
          userId: 'copang',
          password: testEncryptPassword,
          name: '코팡맨',
          nickName: '코팡구매',
          email: 'copang@copang.com',
          phoneNumber: '01012345678',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };

        const otherBuyer: Buyer = {
          id: 2,
          userId: 'copang',
          password: testEncryptPassword,
          name: '코팡맨',
          nickName: '동일한닉네임',
          email: 'copang@copang.com',
          phoneNumber: '01012345678',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };
        loginToken.verifyByAccess.mockReturnValue(givenUserInfo);
        buyerRepository.findOne.mockResolvedValueOnce(givenBuyer).mockResolvedValueOnce(otherBuyer);

        await expect(async () => await sut.changeNickName({ id, nickName })).rejects.toThrow(
          new CoPangException(EXCEPTION_STATUS.USER_CHANGE_NICK_NAME_SAME),
        );
      });
    });
  });

  describe('구매자 이메일 변경 기능 테스트 ', () => {
    describe('성공 케이스', () => {
      test('이메일 변경이 성공한 케이스', async () => {
        const id = 1;
        const email = 'test@email.com';

        const givenUserInfo: UserInfo = {
          id: 1,
          userId: 'copang',
        };

        const givenBuyer: Buyer = {
          id: 1,
          userId: 'copang',
          password: testEncryptPassword,
          name: '코팡맨',
          nickName: '변경전코팡구매',
          email: 'copang@copang.com',
          phoneNumber: '01012345678',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };

        loginToken.verifyByAccess.mockReturnValue(givenUserInfo);
        buyerRepository.findOne.mockResolvedValueOnce(givenBuyer).mockResolvedValueOnce(null);

        const buyerRepositoryChangeEmailSpy = jest.spyOn(buyerRepository, 'changeEmail').mockResolvedValue(givenBuyer);

        const result = await sut.changeEmail({ id, email });

        expect(buyerRepositoryChangeEmailSpy).toHaveBeenCalled();
      });
    });

    describe('실패 케이스', () => {
      test('해당하는 id의 buyer 정보가 DB에 존재하지 않은 경우', async () => {
        const id = 1;
        const email = 'test@email.com';

        const givenUserInfo: UserInfo = {
          id: 1,
          userId: 'copang',
        };

        loginToken.verifyByAccess.mockReturnValue(givenUserInfo);
        buyerRepository.findOne.mockResolvedValue(null);

        await expect(async () => await sut.changeEmail({ id, email })).rejects.toThrow(new CoPangException(EXCEPTION_STATUS.USER_NOT_EXIST));
      });

      test('변경하고자 하는 이메일이 이미 사용중 인 경우', async () => {
        const id = 1;
        const email = 'test@email.com';

        const givenUserInfo: UserInfo = {
          id: 1,
          userId: 'copang',
        };

        const givenBuyer: Buyer = {
          id: 1,
          userId: 'copang',
          password: testEncryptPassword,
          name: '코팡맨',
          nickName: '코팡구매',
          email: 'copang@copang.com',
          phoneNumber: '01012345678',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };

        const otherBuyer: Buyer = {
          id: 2,
          userId: 'copang',
          password: testEncryptPassword,
          name: '코팡맨',
          nickName: '닉네임',
          email: email,
          phoneNumber: '01012345678',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };
        loginToken.verifyByAccess.mockReturnValue(givenUserInfo);
        buyerRepository.findOne.mockResolvedValueOnce(givenBuyer).mockResolvedValueOnce(otherBuyer);

        await expect(async () => await sut.changeEmail({ id, email })).rejects.toThrow(new CoPangException(EXCEPTION_STATUS.USER_CHANGE_EMAIL_SAME));
      });
    });
  });

  describe('구매자 핸드폰번호 변경 기능 테스트 ', () => {
    describe('성공 케이스', () => {
      test('핸드폰번호 변경이 성공한 케이스', async () => {
        const id = 1;
        const phoneNumber = '01012345678';

        const givenUserInfo: UserInfo = {
          id: 1,
          userId: 'copang',
        };

        const givenBuyer: Buyer = {
          id: 1,
          userId: 'copang',
          password: testEncryptPassword,
          name: '코팡맨',
          nickName: '변경전코팡구매',
          email: 'copang@copang.com',
          phoneNumber: '01012345678',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };

        loginToken.verifyByAccess.mockReturnValue(givenUserInfo);
        buyerRepository.findOne.mockResolvedValueOnce(givenBuyer).mockResolvedValueOnce(null);

        const buyerRepositoryChangePhoneNumberSpy = jest.spyOn(buyerRepository, 'changePhoneNumber').mockResolvedValue(givenBuyer);

        const result = await sut.changePhoneNumber({ id, phoneNumber });

        expect(buyerRepositoryChangePhoneNumberSpy).toHaveBeenCalled();
      });
    });

    describe('실패 케이스', () => {
      test('해당하는 id의 buyer 정보가 DB에 존재하지 않은 경우', async () => {
        const id = 1;
        const phoneNumber = '01012345678';

        const givenUserInfo: UserInfo = {
          id: 1,
          userId: 'copang',
        };

        loginToken.verifyByAccess.mockReturnValue(givenUserInfo);
        buyerRepository.findOne.mockResolvedValue(null);

        await expect(async () => await sut.changePhoneNumber({ id, phoneNumber })).rejects.toThrow(
          new CoPangException(EXCEPTION_STATUS.USER_NOT_EXIST),
        );
      });

      test('변경하고자 하는 핸드폰번호가 이미 사용중 인 경우', async () => {
        const id = 1;
        const phoneNumber = '01012345678';

        const givenUserInfo: UserInfo = {
          id: 1,
          userId: 'copang',
        };

        const givenBuyer: Buyer = {
          id: 1,
          userId: 'copang',
          password: testEncryptPassword,
          name: '코팡맨',
          nickName: '코팡구매',
          email: 'copang@copang.com',
          phoneNumber: '01012345678',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };

        const otherBuyer: Buyer = {
          id: 2,
          userId: 'copang',
          password: testEncryptPassword,
          name: '코팡맨',
          nickName: '닉네임',
          email: 'copang@copang.com',
          phoneNumber: '01012345678',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };
        loginToken.verifyByAccess.mockReturnValue(givenUserInfo);
        buyerRepository.findOne.mockResolvedValueOnce(givenBuyer).mockResolvedValueOnce(otherBuyer);

        await expect(async () => await sut.changePhoneNumber({ id, phoneNumber })).rejects.toThrow(
          new CoPangException(EXCEPTION_STATUS.USER_CHANGE_PHONE_NUMBER_SAME),
        );
      });
    });
  });

  describe('구매자 정보 가져오기 기능 테스트', function () {
    describe('성공 케이스', () => {
      it('구매자 토큰 값 id 를 통해 정보를 성공적으로 가져온 경우', async () => {
        const id = 1;
        const now = new Date();

        const givenBuyer: Buyer = {
          id: 1,
          userId: 'copang',
          password: testEncryptPassword,
          name: '코팡맨',
          nickName: '변경전코팡구매',
          email: 'copang@copang.com',
          phoneNumber: '01012345678',
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
        };

        buyerRepository.findOne.mockResolvedValueOnce(givenBuyer);

        const result = await sut.getAccount(id);

        expect(result).toEqual({
          id: 1,
          userId: 'copang',
          name: '코팡맨',
          nickName: '변경전코팡구매',
          email: 'copang@copang.com',
          phoneNumber: '01012345678',
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
        });
      });
    });

    describe('실패 케이스', () => {
      it('해당 id를 통한 구매자정보가 DB에 존재하지 않을 경우', async () => {
        const id = 1;

        buyerRepository.findOne.mockResolvedValueOnce(null);

        await expect(async () => await sut.getAccount(id)).rejects.toThrowError(new CoPangException(EXCEPTION_STATUS.USER_NOT_EXIST));
      });
    });
  });
});
