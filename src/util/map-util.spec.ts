import { listToMap, listToMapAddValue } from './map-util';

describe('map-util test', () => {
  describe('listToMap 테스트', () => {
    test('array 와 key를 통해 새로운 map 반환', () => {
      const givenArray = [
        {
          key: 1,
          value: 2,
        },
        {
          key: 2,
          value: 3,
        },
      ];
      const sut = listToMap(givenArray, (object) => object.key);

      expect(sut.get(1)).toEqual({
        key: 1,
        value: 2,
      });
      expect(sut.get(2)).toEqual({
        key: 2,
        value: 3,
      });
    });
  });

  describe('listToMapAddValue 테스트', () => {
    test('array 와 key, 추가된 addValue 통해 새로운 map 반환', () => {
      const givenArray = [
        {
          key: 1,
          value: 2,
        },
        {
          key: 2,
          value: 3,
        },
      ];
      const givenAddValue = {
        added: true,
      };
      const sut = listToMapAddValue(givenArray, (object) => object.key, givenAddValue);

      expect(sut.get(1)).toEqual({
        key: 1,
        value: 2,
        added: true,
      });
      expect(sut.get(2)).toEqual({
        key: 2,
        value: 3,
        added: true,
      });
    });
  });
});
