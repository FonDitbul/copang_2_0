import { compareAsc } from 'date-fns';

export function isBiggerLeftDate(left: Date, right: Date): boolean {
  return compareAsc(left, right) > 0;
}
