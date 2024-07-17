/**
 * 이름 유효성 검사 기능을 설정합니다.
 */
export const setupNameValidation = () => {
  const elements = {
    nameInput: document.getElementById('name'),
    nameNotice1: document.getElementById('nameNotice-1'),
    nameNotice2: document.getElementById('nameNotice-2'),
  };

  /**
   * 지정된 알림 요소를 표시합니다.
   */
  const showNotice = (notice) => {
    notice.style.display = '';
  };

  /**
   * 지정된 알림 요소를 숨깁니다.
   */
  const hideNotice = (notice) => {
    notice.style.display = 'none';
  };

  /**
   * 모든 알림 요소를 숨깁니다.
   */
  const hideAllNotices = () => {
    hideNotice(elements.nameNotice1);
    hideNotice(elements.nameNotice2);
  };

  /**
   * 이름이 유효한지 검사합니다.
   */
  const isValidName = (name) => {
    const regex = /^[가-힣a-zA-Z]+$/;
    return regex.test(name);
  };

  /**
   * 이름 입력 처리를 담당합니다.
   */
  const handleNameInput = () => {
    const name = elements.nameInput.value.replace(/\s/g, '');

    elements.nameInput.value = name;

    if (name === '') {
      showNotice(elements.nameNotice1);
      hideNotice(elements.nameNotice2);
    } else if (!isValidName(name)) {
      hideNotice(elements.nameNotice1);
      showNotice(elements.nameNotice2);
    } else {
      hideAllNotices();
    }
  };

  // 이벤트 리스너 등록
  elements.nameInput.addEventListener('input', handleNameInput);

  // 초기 상태 설정
  hideAllNotices();
};
