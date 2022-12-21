export const getEmailRegex = () => { return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ };

export const getPasswordRegex = () => { return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/ };

export const Utils = {
    getEmailRegex,
    getPasswordRegex
}