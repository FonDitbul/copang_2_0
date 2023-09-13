import { isEmptyObject } from './object.util';

describe('object util test', () => {
  describe('isEmptyObject 함수 테스트', () => {
    it('해당 객체가 비어있어 true를 반환하는 경우', () => {
      const givenObject = {};

      const result = isEmptyObject(givenObject);

      expect(result).toBeTruthy();
    });

    it('해당 객체가 비어있지 않아 false 를 반환하는 경우', () => {
      const givenObject = { test: true };

      const result = isEmptyObject(givenObject);

      expect(result).toBeFalsy();
    });
  });
});
