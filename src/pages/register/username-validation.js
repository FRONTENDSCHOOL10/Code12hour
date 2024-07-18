import { validateUsername, showElement, hideElement } from './utils';

/**
 * 사용자 아이디 유효성 검사를 설정합니다.
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

export const setupUsernameValidation = (pb) => {
  const useridInput = document.getElementById('userId');
  const idNotice = document.getElementById('idNotice');
  const checkButton = document.querySelector('.register-form__button--check');
  const checkButtonText = document.querySelector('#usernameButtonText');

  const updateUIForValidInput = (isValid) => {
    isValid ? hideElement(idNotice) : showElement(idNotice);
    checkButton.style.borderColor = '';
    checkButtonText.style.color = '';
    checkButton.disabled = false;
  };

  const handleUsernameInput = () => {
    const isValid = validateUsername(useridInput.value);
    updateUIForValidInput(isValid);
  };

  const handleCheckButtonClick = async () => {
    const username = useridInput.value.trim().toLowerCase();
    if (!validateUsername(username)) {
      showModal('알림', '5자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합해 주세요.');
      return;
    }

    checkButton.disabled = true;
    try {
      const users = await pb.collection('users').getFullList();
      const isDuplicate = users.some((user) => user.username.toLowerCase() === username);

      if (isDuplicate) {
        showModal('알림', '사용 불가능한 아이디 입니다.');
        checkButton.disabled = false;
      } else {
        showModal('알림', '사용 가능한 아이디 입니다.');
        checkButton.style.borderColor = '#a6a6a6';
        checkButtonText.style.color = '#a6a6a6';
      }
    } catch (error) {
      console.error('Username check error:', error);
      showModal('알림', '아이디 확인 중 오류가 발생했습니다. 다시 시도해 주세요.');
      checkButton.disabled = false;
    }
  };

  useridInput.addEventListener('input', handleUsernameInput);
  checkButton.addEventListener('click', handleCheckButtonClick);
};
