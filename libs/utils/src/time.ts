export const stringToDate = (date: string): Date => {
  return new Date(date);
};
export const setDateWithTimeZone = (date: Date): Date => {
  const timezone = date.getTimezoneOffset();
  const resultData = new Date(date.getTime() - timezone * 60 * 1000);

  return resultData;
};

export const dateToString = (date: Date) => {
  return date.toISOString();
};
