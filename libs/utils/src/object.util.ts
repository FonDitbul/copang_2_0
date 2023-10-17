export const isEmptyObject = (object: object) => {
  return JSON.stringify(object) === '{}';
};

export const isContainKeyInObject = (object: object, key: string) => {
  return object[key] !== undefined;
};

export const isNotContainKeyInObject = (object: object, key: string) => {
  return object[key] == undefined;
};
