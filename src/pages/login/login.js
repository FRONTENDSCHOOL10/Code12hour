import './login.scss';
import { defineCustomElements } from '@/utils/index';
import { footer, header, headerSmall } from '@/components/index';
import { pb } from '@/api/index';

const CUSTOM_ELEMENTS = [
  ['c-header', header],
  ['c-header-small', headerSmall],
  ['c-footer', footer],
];

// 모달
const showModal = (title, message) => {
  const modal = document.querySelector('c-modal');
  const titleElement = modal.querySelector('.login-modal__title');
  const bodyElement = modal.querySelector('.login-modal__body');

  if (titleElement) titleElement.textContent = title;
  if (bodyElement) bodyElement.textContent = message;

  modal.showModal();
};

// 로그인 인증 및 메인페이지로 리다이렉션
const handleAuth = async () => {
  try {
    const pocketbaseAuth = JSON.parse(localStorage.getItem('pocketbase_auth'));
    if (!pocketbaseAuth) {
      throw new Error('인증 데이터를 찾을 수 없습니다.');
    }

    const { model, token } = pocketbaseAuth;
    localStorage.setItem(
      'auth',
      JSON.stringify({
        isAuth: !!model,
        user: model,
        token,
      })
    );

    showModal('로그인 성공', '메인페이지로 이동합니다.');
    setTimeout(() => {
      location.href = '/';
    }, 500);
  } catch (error) {
    console.error('Error handling authentication:', error);
    showModal('로그인 오류', '인증 정보 처리 중 오류가 발생했습니다.');
  }
};

// 로그인
const handleLogin = async (e) => {
  e.preventDefault();
  const id = document.querySelector('#login-id')?.value;
  const pw = document.querySelector('#login-pw')?.value;

  if (!id || !pw) {
    showModal('로그인 실패', '아이디와 비밀번호를 모두 입력해주세요.');
    return;
  }

  try {
    await pb.collection('users').authWithPassword(id, pw);
    await handleAuth();
  } catch (error) {
    console.error('Login error:', error);
    showModal('로그인 실패', '아이디와 비밀번호를 다시 확인해주세요.');
  }
};

// 회원가입
const handleRegister = () => {
  window.location.href = '/src/pages/register/';
};

// 초기 이벤트 리스너 설정 관리
const initEventListeners = () => {
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
    loginForm.querySelector('.login-button__register')?.addEventListener('click', handleRegister);
  }

  document.querySelector('#modal__close')?.addEventListener('click', () => {
    document.querySelector('c-modal')?.close();
  });
};

const init = () => {
  defineCustomElements(CUSTOM_ELEMENTS);
  initEventListeners();
};

init();
