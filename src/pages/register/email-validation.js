import { validateEmail, showElement, hideElement } from './utils';

/**
 * 이메일 유효성 검사 기능을 설정합니다.
 * @param {Object} pb - PocketBase 인스턴스
 */
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
/**
 * 필요한 모든 요소가 존재하는지 확인합니다.
 * @param {Object} elements - DOM 요소 객체
 * @returns {boolean} 모든 요소가 존재하면 true, 그렇지 않으면 false
 */
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

/**
 * 이메일 입력 처리를 담당합니다.
 * @param {Object} elements - DOM 요소 객체
 */
const handleEmailInput = (elements) => {
  const { emailInput, emailConfirm1, emailConfirm2, emailButton, emailButtonText } = elements;
  const emailValue = emailInput.value.trim();

  if (emailValue === '') {
    showElement(emailConfirm1);
    hideElement(emailConfirm2);
  } else {
    hideElement(emailConfirm1);
    if (!validateEmail(emailValue) || hasInvalidSpecialChars(emailValue)) {
      showElement(emailConfirm2);
    } else {
      hideElement(emailConfirm2);
    }
  }

  resetEmailButton(emailButton, emailButtonText);
};

/**
 * 이메일에 허용되지 않은 특수 문자가 포함되어 있는지 확인합니다.
 * @param {string} email - 확인할 이메일 주소
 * @returns {boolean} 허용되지 않은 특수 문자가 포함되어 있으면 true, 그렇지 않으면 false
 */
const hasInvalidSpecialChars = (email) => {
  const invalidCharsRegex = /[^a-zA-Z0-9@._-]/;
  return invalidCharsRegex.test(email);
};

/**
 * 이메일 중복 확인 처리를 담당합니다.
 * @param {Object} elements - DOM 요소 객체
 * @param {Object} pb - PocketBase 인스턴스
 */
const handleEmailCheck = async (elements, pb) => {
  const { emailInput, emailButton, emailButtonText, emailConfirm2 } = elements;
  const emailValue = emailInput.value.trim().toLowerCase();

  if (emailValue === '') {
    alert('이메일을 입력해 주세요.');
    return;
  }
  if (!validateEmail(emailValue)) {
    alert('이메일 형식으로 입력해주세요.');
    return;
  }
  if (hasInvalidSpecialChars(emailValue)) {
    showElement(emailConfirm2);
    alert('허용되지 않는 특수 문자가 포함되어 있습니다.');
    return;
  }

  emailButton.disabled = true;
  try {
    const result = await pb.collection('users').getFullList({
      filter: `email ~ '${emailValue}'`, // 대소문자를 구분하지 않는 부분 일치 검색
    });

    const exactMatch = result.some((user) => user.email.toLowerCase() === emailValue);

    if (exactMatch) {
      alert('사용 불가능한 이메일 입니다.');
    } else {
      alert('사용 가능한 이메일 입니다.');
      emailButton.style.borderColor = '#a6a6a6';
      emailButtonText.style.color = '#a6a6a6';
    }
  } catch (error) {
    console.error('이메일 확인 중 오류 발생:', error);
    alert('이메일 확인 중 오류가 발생했습니다. 다시 시도해 주세요.');
  } finally {
    emailButton.disabled = false;
  }
};
/**
 * 이메일 확인 버튼을 초기 상태로 되돌립니다.
 * @param {HTMLElement} button - 이메일 확인 버튼
 * @param {HTMLElement} buttonText - 버튼 내부의 텍스트 요소
 */
const resetEmailButton = (button, buttonText) => {
  button.style.borderColor = '';
  buttonText.style.color = '';
  button.disabled = false;
};
