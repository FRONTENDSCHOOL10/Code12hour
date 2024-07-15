import { validatePassword, showElement, hideElement } from './utils';

export const setupPasswordValidation = () => {
  const passwordInput = document.getElementById('password');
  const pwdNotice1 = document.getElementById('pwdNotice-1');
  const pwdNotice2 = document.getElementById('pwdNotice-2');

  passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    if (password.length < 8) {
      showElement(pwdNotice1);
      hideElement(pwdNotice2);
    } else {
      const isValid = validatePassword(password);
      if (isValid) {
        hideElement(pwdNotice1);
        hideElement(pwdNotice2);
      } else {
        hideElement(pwdNotice1);
        showElement(pwdNotice2);
      }
    }
  });
};

export const setupPasswordConfirmation = () => {
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const pwdConfirmNotice = document.getElementById('pwdConfirm');

  confirmPasswordInput.addEventListener('input', () => {
    const passwordsMatch = passwordInput.value === confirmPasswordInput.value;
    passwordsMatch ? hideElement(pwdConfirmNotice) : showElement(pwdConfirmNotice);
  });
};
