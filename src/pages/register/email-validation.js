import { validateEmail, showElement, hideElement } from './utils';

/**
 * 이메일 유효성 검사 기능을 설정합니다.
 * @param {Object} pb - PocketBase 인스턴스
 */

// 모달 관련 함수
const showModal = (title, message) => {
  const modal = document.querySelector('c-modal');
  const titleElement = modal.querySelector('.register-modal__title');
  const bodyElement = modal.querySelector('.register-modal__body');

  if (titleElement) titleElement.textContent = title;
  if (bodyElement) bodyElement.textContent = message;

  modal.showModal();
};

export const setupEmailValidation = (pb) => {
  const elements = {
    emailInput: document.getElementById('email'),
    emailConfirm1: document.getElementById('emailConfirm-1'),
    emailConfirm2: document.getElementById('emailConfirm-2'),
    emailButton: document.getElementById('emailButton'),
    emailButtonText: document.getElementById('emailButtonText'),
  };

  if (!validateElements(elements)) return;

  elements.emailInput.addEventListener('input', () => handleEmailInput(elements));
  elements.emailButton.addEventListener('click', () => handleEmailCheck(elements, pb));
};

const validateElements = (elements) => {
  const missingElements = Object.entries(elements)
    .filter(([, element]) => !element)
    .map(([key]) => key);

  if (missingElements.length > 0) {
    console.error('다음 요소를 찾을 수 없습니다:', missingElements.join(', '));
    return false;
  }
  return true;
};

const handleEmailInput = (elements) => {
  const { emailInput, emailConfirm1, emailConfirm2, emailButton, emailButtonText } = elements;
  const emailValue = emailInput.value.trim();

  toggleEmailConfirmation(emailValue, emailConfirm1, emailConfirm2);
  resetEmailButton(emailButton, emailButtonText);
};

const toggleEmailConfirmation = (emailValue, emailConfirm1, emailConfirm2) => {
  if (emailValue === '') {
    showElement(emailConfirm1);
    hideElement(emailConfirm2);
  } else {
    hideElement(emailConfirm1);
    if (!isValidEmail(emailValue)) {
      showElement(emailConfirm2);
    } else {
      hideElement(emailConfirm2);
    }
  }
};

const isValidEmail = (email) => validateEmail(email) && !hasInvalidSpecialChars(email);

const hasInvalidSpecialChars = (email) => /[^a-zA-Z0-9@._-]/.test(email);

const handleEmailCheck = async (elements, pb) => {
  const { emailInput, emailButton, emailButtonText, emailConfirm2 } = elements;
  const emailValue = emailInput.value.trim().toLowerCase();

  if (!validateEmailInput(emailValue, emailConfirm2)) return;

  emailButton.disabled = true;
  try {
    const result = await pb.collection('users').getFullList({
      filter: `email ~ '${emailValue}'`,
    });

    const exactMatch = result.some((user) => user.email.toLowerCase() === emailValue);
    handleEmailCheckResult(exactMatch, emailButton, emailButtonText);
  } catch (error) {
    console.error('이메일 확인 중 오류 발생:', error);
    alert('이메일 확인 중 오류가 발생했습니다. 다시 시도해 주세요.');
  } finally {
    emailButton.disabled = false;
  }
};

const validateEmailInput = (emailValue, emailConfirm2) => {
  if (emailValue === '') {
    showModal('알림', '이메일을 입력해주세요');
    return false;
  }
  if (!validateEmail(emailValue)) {
    showModal('알림', '이메일을 형식으로 입력해주세요');
    return false;
  }
  if (hasInvalidSpecialChars(emailValue)) {
    showElement(emailConfirm2);
    showModal('알림', '허용되지 않는 특수 문자가 포함되어 있습니다.');
    return false;
  }
  return true;
};

const handleEmailCheckResult = (exactMatch, emailButton, emailButtonText) => {
  if (exactMatch) {
    showModal('알림', '사용 불가능한 이메일 입니다.');
  } else {
    showModal('알림', '사용 가능한 이메일 입니다.');
    emailButton.style.borderColor = '#a6a6a6';
    emailButtonText.style.color = '#a6a6a6';
  }
};

const resetEmailButton = (button, buttonText) => {
  button.style.borderColor = '';
  buttonText.style.color = '';
  button.disabled = false;
};
