import { validateEmail, showElement, hideElement } from './utils';

const users = {
  email: ['ldd0702@naver.com'],
};

export const setupEmailValidation = () => {
  const emailInput = document.getElementById('email');
  const emailConfirm1 = document.getElementById('emailConfirm-1');
  const emailConfirm2 = document.getElementById('emailConfirm-2');
  const emailButton = document.getElementById('emailButton');
  const emailButtonText = document.getElementById('emailButtonText');

  emailInput.addEventListener('input', () => {
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
      showElement(emailConfirm1);
      hideElement(emailConfirm2);
    } else {
      hideElement(emailConfirm1);
      validateEmail(emailValue) ? hideElement(emailConfirm2) : showElement(emailConfirm2);
    }

    emailButton.style.borderColor = '';
    emailButtonText.style.color = '';
    emailButton.disabled = false;
  });

  emailButton.addEventListener('click', () => {
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
      alert('이메일을 입력해 주세요.');
      return;
    }
    if (!validateEmail(emailValue)) {
      alert('이메일 형식으로 입력해주세요.');
      return;
    }

    const emailLower = emailValue.toLowerCase();
    if (users.email.includes(emailLower)) {
      alert('사용 불가능한 이메일 입니다.');
    } else {
      alert('사용 가능한 이메일 입니다.');
      emailButton.style.borderColor = '#a6a6a6';
      emailButtonText.style.color = '#a6a6a6';
      emailButton.disabled = true;
    }
  });
};
