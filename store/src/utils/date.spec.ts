import { isBiggerLeftDate } from "./date";

describe("date util test", () => {
  describe("isOverTimeLeftDate left time 의 시간이 초과 했는지 테스트 ", function () {
    it("right date 보다 left date가 큰 경우", () => {
      const givenLeftDate = new Date(2000, 1, 11);
      const givenRightDate = new Date(1989, 1, 11);

      const result = isBiggerLeftDate(givenLeftDate, givenRightDate);

      expect(result).toBeTruthy();
    });

    it("left date 보다 right date가 큰 경우", () => {
      const givenLeftDate = new Date(1999, 1, 11);
      const givenRightDate = new Date(2000, 1, 11);

      const result = isBiggerLeftDate(givenLeftDate, givenRightDate);

      expect(result).toBeFalsy();
    });

    it("left date 와 right date가 동일 한 경우", () => {
      const givenLeftDate = new Date(2000, 1, 11);
      const givenRightDate = new Date(2000, 1, 11);

      const result = isBiggerLeftDate(givenLeftDate, givenRightDate);

      expect(result).toBeFalsy();
    });
  });
});
