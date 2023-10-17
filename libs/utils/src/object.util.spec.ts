import { isContainKeyInObject, isEmptyObject, isNotContainKeyInObject } from './object.util';

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

  describe('isContainKeyInObject 함수 테스트', () => {
    it('object 안에 해당 key 값의 데이터가 존재하여 true를 반환 하는 경우', () => {
      const givenObject = {
        test: 'test',
      };

      const result = isContainKeyInObject(givenObject, 'test');

      expect(result).toBeTruthy();
    });

    it('object 안에 해당 key 값의 데이터가 존재하지 않아 false를 반환하는 경우', () => {
      const givenObject = { testNotihing: true };

      const result = isContainKeyInObject(givenObject, 'test');

      expect(result).toBeFalsy();
    });
  });

  describe('isNotContainKeyInObject 함수 테스트', () => {
    it('object 안에 해당 key 값의 데이터가 존재하지않아 true를 반환 하는 경우', () => {
      const givenObject = {
        testNotContain: 'test',
      };

      const result = isNotContainKeyInObject(givenObject, 'test');

      expect(result).toBeTruthy();
    });

    it('object 안에 해당 key 값의 데이터가 존재하여 false를 반환하는 경우', () => {
      const givenObject = { test: true };

      const result = isNotContainKeyInObject(givenObject, 'test');

      expect(result).toBeFalsy();
    });
  });
});
