import './register.scss';

import { defineCustomElements } from '@/utils/index';
import { footer, header } from '@/components/index';

// const app = document.getElementById('app');

const init = () => {
  defineCustomElements([
    ['c-header', header],
    ['c-footer', footer],
  ]);

  // appendCustomElement(app, 'c-header');
  // appendCustomElement(app, 'c-footer');
};

init();

// 아이디 입력 조건
document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('username');
  const idNotice = document.getElementById('idNotice');

  usernameInput.addEventListener('input', () => {
    const value = usernameInput.value;
    const isValid = validateUsername(value);

    if (isValid) {
      idNotice.style.display = 'none';
    } else {
      idNotice.style.display = null;
    }
  });

  function validateUsername(username) {
    const lengthValid = username.length > 4 && username.length < 17;
    const formatValid = /^[a-zA-Z0-9]+$/.test(username);
    const containsLetter = /[a-zA-Z]/.test(username);
    const isNumeric = /^[0-9]+$/.test(username);

    return lengthValid && formatValid && !isNumeric && containsLetter;
  }
});

// 중복확인 버튼
document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('username');
  const idNotice = document.getElementById('idNotice');
  const checkButton = document.querySelector('.register-form__button--check');
  const checkButtonText = document.querySelector('.register-form__button-text');
  const users = { id: ['examplE1', 'examplE2', 'examplE3'] };

  usernameInput.addEventListener('input', () => {
    const value = usernameInput.value;
    const isValid = validateUsername(value);

    if (isValid) {
      idNotice.style.display = 'none';
    } else {
      idNotice.style.display = null;
    }

    resetCheckButton();
  });

  checkButton.addEventListener('click', () => {
    const username = usernameInput.value.toLowerCase();
    const isValid = validateUsername(username);

    if (!isValid) {
      alert('5자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합해 주세요.');
      return;
    }

    if (users.id.includes(username)) {
      alert('사용 불가능한 아이디 입니다.');
    } else {
      alert('사용 할 수 있는 아이디 입니다.');

      checkButton.style.borderColor = '#a6a6a6';
      checkButtonText.style.color = '#a6a6a6';
      checkButton.disabled = true;
    }
  });

  function validateUsername(username) {
    const lengthValid = username.length > 4 && username.length < 17;
    const formatValid = /^[a-zA-Z0-9]+$/.test(username);
    const containsLetter = /[a-zA-Z]/.test(username);
    const isNumeric = /^[0-9]+$/.test(username);

    return lengthValid && formatValid && !isNumeric && containsLetter;
  }

  function resetCheckButton() {
    idNotice.style.color = '';
    checkButton.style.borderColor = '';
    checkButtonText.style.color = '';
    checkButton.disabled = false;
  }
});
