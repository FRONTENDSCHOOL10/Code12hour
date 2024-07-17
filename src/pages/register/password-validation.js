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

  /**
   * 비밀번호 입력 처리를 담당합니다.
   */
  const handlePasswordInput = () => {
    const password = elements.passwordInput.value;
    if (password.length < 8) {
      showElement(elements.pwdNotice1);
      hideElement(elements.pwdNotice2);
    } else {
      const isValid = validatePassword(password);
      if (isValid) {
        hideElement(elements.pwdNotice1);
        hideElement(elements.pwdNotice2);
      } else {
        hideElement(elements.pwdNotice1);
        showElement(elements.pwdNotice2);
      }
    }
  };

  // 이벤트 리스너 등록
  elements.passwordInput.addEventListener('input', handlePasswordInput);
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

  /**
   * 비밀번호 확인 입력 처리를 담당합니다.
   */
  const handleConfirmPasswordInput = () => {
    const passwordsMatch = elements.passwordInput.value === elements.confirmPasswordInput.value;
    passwordsMatch
      ? hideElement(elements.pwdConfirmNotice)
      : showElement(elements.pwdConfirmNotice);
  };

  // 이벤트 리스너 등록
  elements.confirmPasswordInput.addEventListener('input', handleConfirmPasswordInput);
};
