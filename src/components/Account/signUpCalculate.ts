export function passwordSameCheck(
  password: string,
  passwordCheck: string,
): boolean {
  if (password === passwordCheck) {
    return true;
  }
  return false;
}

export function emailValidation(email: string): boolean {
  const emailReg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailReg.test(email);
}

export function phoneNumberValidation(phoneNumber: string): boolean {
  const phoneNumberReg = /^01([0|1|6|7|8|9])?([0-9]{7,8})$/;
  return phoneNumberReg.test(phoneNumber)
}
