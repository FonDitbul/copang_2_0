import { costDisplayDot } from './Cost.Logic';

describe('Cost Logic 테스트', function () {
  it('숫자 1000 표기를 1,000 으로 반환', () => {
    const given = 1000;

    const result = costDisplayDot(given);

    expect(result).toBe('1,000');
  });

  it('숫자 1000000000000000 표기를 1,000,000,000,000,000 으로 반환', () => {
    const given = 1000000000000000;

    const result = costDisplayDot(given);

    expect(result).toBe('1,000,000,000,000,000');
  });

  it('숫자 타입이 아닐 경우 에러 반환', () => {
    const given: any = '1000';

    expect(() => costDisplayDot(given)).toThrowError(new Error('number 타입 이어야 합니다.'));
  });
});
