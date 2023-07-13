export const getEmailRegex = () => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
};

export const getPasswordRegex = () => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
};

export const createUTCDate = (y: number, m: number, d: number) => {
  return new Date(Date.UTC(y, m, d, 0, 0, 0));
};

export const calculateAmountInIntegrationCurrencyLower = (
  amountInPoints: number,
  conversionRate: number
) => {
  const fullAmountInCurrency = amountInPoints * conversionRate;
  if (conversionRate > 0.1) return Math.floor(fullAmountInCurrency);
  return Math.floor(fullAmountInCurrency * 100) / 100;
};

export const calculatePointsFromIntegrationCurrencyUpper = (
  amountInCurrency: number,
  conversionRate: number
) => {
  return Math.ceil(amountInCurrency / conversionRate);
};

const getMonthName = (monthNumber: number) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("en-US", { month: "long" });
};

export const createBirthdayFromUTCString = (birthDateString: string) => {
  const birthDate = new Date(birthDateString);
  return `${getMonthName(
    birthDate.getUTCMonth() + 1
  )} ${birthDate.getUTCDate()}`;
};

export const getUserNextBirthday = (birthDateString: string): Date => {
  const currentYear = new Date().getFullYear();
  const dateOfBirth = new Date(birthDateString || "");
  dateOfBirth.setFullYear(currentYear);
  if (dateOfBirth < new Date()) dateOfBirth.setFullYear(currentYear + 1);
  return dateOfBirth;
};

export const Utils = {
  getEmailRegex,
  getPasswordRegex,
  calculateAmountInIntegrationCurrencyLower,
  calculatePointsFromIntegrationCurrencyUpper,
  createBirthdayFromUTCString,
  getUserNextBirthday,
};
