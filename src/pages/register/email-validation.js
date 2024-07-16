import { validateEmail, showElement, hideElement } from './utils';

export const setupEmailValidation = (pb) => {
  const emailInput = document.getElementById('email');
  const emailConfirm1 = document.getElementById('emailConfirm-1');
  const emailConfirm2 = document.getElementById('emailConfirm-2');
  const emailButton = document.getElementById('emailButton');
  const emailButtonText = document.getElementById('emailButtonText');

  if (!emailInput || !emailConfirm1 || !emailConfirm2 || !emailButton || !emailButtonText) {
    console.error('One or more required elements are missing');
    return;
  }

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

  emailButton.addEventListener('click', async () => {
    const emailValue = emailInput.value.trim();

    if (emailValue === '') {
      alert('이메일을 입력해 주세요.');
      return;
    }
    if (!validateEmail(emailValue)) {
      alert('이메일 형식으로 입력해주세요.');
      return;
    }

    emailButton.disabled = true;
    try {
      const result = await pb.collection('users').getFullList({
        filter: `email = '${emailValue}'`,
      });

      if (result.length > 0) {
        alert('사용 불가능한 이메일 입니다.');
        emailButton.disabled = false;
      } else {
        alert('사용 가능한 이메일 입니다.');
        emailButton.style.borderColor = '#a6a6a6';
        emailButtonText.style.color = '#a6a6a6';
        // 버튼은 비활성화 상태로 유지
      }
    } catch (error) {
      console.error('이메일 확인 중 오류 발생:', error);
      alert('이메일 확인 중 오류가 발생했습니다. 다시 시도해 주세요.');
      emailButton.disabled = false;
    }
  });
};
