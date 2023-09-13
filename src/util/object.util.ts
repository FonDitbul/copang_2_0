export const isEmptyObject = (object: object) => {
  return JSON.stringify(object) === '{}';
};
