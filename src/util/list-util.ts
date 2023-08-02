export const mapKeyValueArray = <T, U>(map: Map<T, U[]>, key: T, value: U) => {
  const copy = new Map(map);
  const valueArr = copy.get(key) ?? [];
  valueArr.push(value);
  copy.set(key, valueArr);
  return copy;
};
