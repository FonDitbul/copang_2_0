import { SortValidationPipe } from './sort-validation.pipe';
import { SortType } from '../../domain/sort-type';
import { BadRequestException } from '@nestjs/common';

describe('sort-validation pipe test', () => {
  const sut = new SortValidationPipe();

  describe('성공 케이스', () => {
    test('sort value가 ASC를 전달 받아 asc로 변환에 성공한 경우 ', () => {
      const result = sut.transform('ASC', { type: undefined });
      expect(result).toBe('asc');
    });

    test('sort value가 ASC를 전달 받은 경우 ', () => {
      const result = sut.transform('asc', { type: undefined });
      expect(result).toBe('asc');
    });

    test('sort value가 DESC를 전달 받아 desc로 변환에 성공한 경우', () => {
      const result = sut.transform('DESC', { type: undefined });
      expect(result).toBe('desc');
    });

    test('sort value가 DESC를 전달 받은 경우', () => {
      const result = sut.transform('desc', { type: undefined });
      expect(result).toBe('desc');
    });
  });

  describe('실패 케이스', () => {
    test('sort value가 정의되어 있지 않은 값을 전달 받았을 경우', () => {
      expect(() => {
        sut.transform(<SortType>'test', { type: undefined });
      }).toThrowError(new BadRequestException('Sort should to be ASC or DESC'));
    });
  });
});
