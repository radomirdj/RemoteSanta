export const getEmailRegex = () => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
};

export const getPasswordRegex = () => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
};

export const createUTCDate = (y: number, m: number, d: number) => {
  return new Date(Date.UTC(y, m, d, 0, 0, 0));
};

export const Utils = {
  getEmailRegex,
  getPasswordRegex,
};
