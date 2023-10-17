export const listToMap = <T, U>(array: T[], keyFunc: (value: T) => U): Map<U, T> => {
  const map = new Map<U, T>();
  for (const value of array) {
    const key = keyFunc(value);
    map.set(key, value);
  }
  return map;
};

export const listToMapAddValue = <T, U, Y>(array: T[], keyFunc: (value: T) => U, addValue: Y): Map<U, T & Y> => {
  const map = new Map<U, T & Y>();
  for (const value of array) {
    const key = keyFunc(value);
    const newValue = Object.assign(value, addValue);
    map.set(key, newValue);
  }
  return map;
};
