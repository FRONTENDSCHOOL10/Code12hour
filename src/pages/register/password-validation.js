import { validatePassword, showElement, hideElement } from './utils';

/**
 * 비밀번호 유효성 검사 기능을 설정합니다.
 */
export const setupPasswordValidation = () => {
  const elements = {
    passwordInput: document.getElementById('password'),
    pwdNotice1: document.getElementById('pwdNotice-1'),
    pwdNotice2: document.getElementById('pwdNotice-2'),
  };

  const updatePasswordValidationUI = (password) => {
    if (password.length < 8) {
      showElement(elements.pwdNotice1);
      hideElement(elements.pwdNotice2);
    } else if (validatePassword(password)) {
      hideElement(elements.pwdNotice1);
      hideElement(elements.pwdNotice2);
    } else {
      hideElement(elements.pwdNotice1);
      showElement(elements.pwdNotice2);
    }
  };

  elements.passwordInput.addEventListener('input', () =>
    updatePasswordValidationUI(elements.passwordInput.value)
  );
};

/**
 * 비밀번호 확인 기능을 설정합니다.
 */
export const setupPasswordConfirmation = () => {
  const elements = {
    passwordInput: document.getElementById('password'),
    confirmPasswordInput: document.getElementById('confirmPassword'),
    pwdConfirmNotice: document.getElementById('pwdConfirm'),
  };

  const updatePasswordConfirmationUI = () => {
    const passwordsMatch = elements.passwordInput.value === elements.confirmPasswordInput.value;
    passwordsMatch
      ? hideElement(elements.pwdConfirmNotice)
      : showElement(elements.pwdConfirmNotice);
  };

  elements.confirmPasswordInput.addEventListener('input', updatePasswordConfirmationUI);
};
