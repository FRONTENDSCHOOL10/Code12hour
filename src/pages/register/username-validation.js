import { validateUsername, showElement, hideElement } from './utils';

const users = {
  id: ['examplE1', 'example2', 'example3'],
  email: ['ldd0702@naver.com'],
};

export const setupUsernameValidation = () => {
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

  checkButton.addEventListener('click', () => {
    const username = useridInput.value.toLowerCase();
    if (!validateUsername(username)) {
      alert('5자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합해 주세요.');
      return;
    }

    if (users.id.map((id) => id.toLowerCase()).includes(username)) {
      alert('사용 불가능한 아이디 입니다.');
    } else {
      alert('사용 가능한 아이디 입니다.');
      checkButton.style.borderColor = '#a6a6a6';
      checkButtonText.style.color = '#a6a6a6';
      checkButton.disabled = true;
    }
  });
};
