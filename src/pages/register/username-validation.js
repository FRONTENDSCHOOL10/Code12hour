import { validateUsername, showElement, hideElement } from './utils';

export const setupUsernameValidation = (pb) => {
  const useridInput = document.getElementById('userId');
  const idNotice = document.getElementById('idNotice');
  const checkButton = document.querySelector('.register-form__button--check');
  const checkButtonText = document.querySelector('#usernameButtonText');

  useridInput.addEventListener('input', () => {
    const isValid = validateUsername(useridInput.value);
    isValid ? hideElement(idNotice) : showElement(idNotice);

    checkButton.style.borderColor = '';
    checkButtonText.style.color = '';
    checkButton.disabled = false;
  });

  checkButton.addEventListener('click', async () => {
    const username = useridInput.value.toLowerCase();
    if (!validateUsername(username)) {
      alert('5자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합해 주세요.');

      return;
    }

    checkButton.disabled = true;
    try {
      const result = await pb.collection('users').getFullList({
        filter: `username = "${username}"`,
      });

      if (result.length > 0) {
        alert('사용 불가능한 아이디 입니다.');
        checkButton.disabled = false;
      } else {
        alert('사용 가능한 아이디 입니다.');
        checkButton.style.borderColor = '#a6a6a6';
        checkButtonText.style.color = '#a6a6a6';
      }
    } catch (error) {
      console.error('Username check error:', error);
      alert('아이디 확인 중 오류가 발생했습니다. 다시 시도해 주세요.');
      checkButton.disabled = false;
    }
  });
};
