import {
  emailValidation,
  formattingPhoneNumber,
  passwordSameCheck,
  phoneNumberValidation,
} from "./signUpCalculate";

describe("signUpCalculate 테스트", function () {
  describe("passwordSameCheck 비밀번호와 비밀번호 확인 value가 같은지 테스트", function () {
    it("두 비밀번호가 같을 경우", () => {
      const givenPassword = "testPassword1";
      const givenPasswordCheck = "testPassword1";

      const result = passwordSameCheck(givenPassword, givenPasswordCheck);

      expect(result).toBeTruthy();
    });

    it("두 비밀번호가 다를 경우", () => {
      const givenPassword = "testPassword1";
      const givenPasswordCheck = "otherPassword1";

      const result = passwordSameCheck(givenPassword, givenPasswordCheck);

      expect(result).toBeFalsy();
    });
  });

  describe("emailValidation email 형식 테스트", () => {
    it("이메일 형식이 올바르게 입력되었을 경우", () => {
      const givenEmail = "test@google.com";

      const result = emailValidation(givenEmail);

      expect(result).toBeTruthy();
    });

    it("이메일 형식이 올바르게 입력되지 않았을 경우", () => {
      const givenEmail = "testgoogle.com";

      const result = emailValidation(givenEmail);

      expect(result).toBeFalsy();
    });
  });

  describe("phoneNumberValidation 핸드폰 번호 형식 테스트", () => {
    it("핸드폰 번호 가 올바르게 입력된 경우", () => {
      const givenPhoneNumber = "01012345678";

      const result = phoneNumberValidation(givenPhoneNumber);

      expect(result).toBeTruthy();
    });

    it("핸드폰 번호 에 문자가 들어간 경우 ", () => {
      const givenPhoneNumber = "0101234a";

      const result = phoneNumberValidation(givenPhoneNumber);

      expect(result).toBeFalsy();
    });

    it("핸드폰 번호 숫자가 짧은 경우", () => {
      const givenPhoneNumber = "0101234";

      const result = phoneNumberValidation(givenPhoneNumber);

      expect(result).toBeFalsy();
    });
  });

  describe("formattingPhoneNumber 핸드폰 번호 포매팅 테스트", () => {
    it("하이픈이 입력된 경우", () => {
      const givenPhoneNumber = "010-1234-5678";

      const result = formattingPhoneNumber(givenPhoneNumber);

      expect(result).toBe("01012345678");
    });

    it("띄어쓰기로 입력된 경우 ", () => {
      const givenPhoneNumber = "010 1234 5678";

      const result = formattingPhoneNumber(givenPhoneNumber);

      expect(result).toBe("01012345678");
    });
  });
});
