export const validateUsername = (username) => {
  const lengthValid = username.length >= 5 && username.length <= 16;
  const formatValid = /^[a-zA-Z0-9]+$/.test(username);
  const containsLetter = /[a-zA-Z]/.test(username);
  const isNumeric = /^[0-9]+$/.test(username);

  return lengthValid && formatValid && !isNumeric && containsLetter;
};

export const validatePassword = (password) => {
  if (password.length < 8) return false;

  const hasLetter = /[a-zA-Z]/.test(password);
  const numberCount = (password.match(/[0-9]/g) || []).length;
  const specialCharCount = (password.match(/[!@#$%^&*()_+\-=\\[\]{};:'",.<>/?\\|]/g) || []).length;

  return hasLetter && numberCount >= 1 && specialCharCount >= 1;
};

export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const showElement = (element) => (element.style.display = '');
export const hideElement = (element) => (element.style.display = 'none');
