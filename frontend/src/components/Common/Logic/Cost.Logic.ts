export function costDisplayDot(cost: number): string {
  if (typeof cost !== 'number') {
    throw new Error('number 타입 이어야 합니다.');
  }
  return cost.toLocaleString('ko-KR');
}
