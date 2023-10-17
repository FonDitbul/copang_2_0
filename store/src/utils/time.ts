export const stringToDate = (date: string): Date => {
  return new Date(date);
};
export const setDateWithTimeZone = (date: Date): Date => {
  const tempDate = new Date();

  const timezone = tempDate.getTimezoneOffset();

  const resultDate = new Date(date.getTime() - timezone * 60 * 100 * 10);

  return resultDate;
};

export const dateToString = (date: Date) => {
  return date.toISOString();
};
