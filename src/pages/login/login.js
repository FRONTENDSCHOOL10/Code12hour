import './login.scss';

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

const registerButton = document.querySelector('.login-button__register');

registerButton.addEventListener('click', function () {
  window.location.href = '/src/pages/register/'; // 회원가입 페이지 경로
});
