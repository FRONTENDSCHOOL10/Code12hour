/**
 * 이름 유효성 검사 기능을 설정합니다.
 */
export const setupNameValidation = () => {
  const elements = {
    nameInput: document.getElementById('name'),
    nameNotice1: document.getElementById('nameNotice-1'),
    nameNotice2: document.getElementById('nameNotice-2'),
  };

  const toggleNotice = (notice, show) => {
    notice.style.display = show ? '' : 'none';
  };

  const hideAllNotices = () => {
    toggleNotice(elements.nameNotice1, false);
    toggleNotice(elements.nameNotice2, false);
  };

  const isValidName = (name) => /^[가-힣a-zA-Z]+$/.test(name);

  const handleNameInput = () => {
    const name = elements.nameInput.value.replace(/\s/g, '');
    elements.nameInput.value = name;

    if (name === '') {
      toggleNotice(elements.nameNotice1, true);
      toggleNotice(elements.nameNotice2, false);
    } else if (!isValidName(name)) {
      toggleNotice(elements.nameNotice1, false);
      toggleNotice(elements.nameNotice2, true);
    } else {
      hideAllNotices();
    }
  };

  elements.nameInput.addEventListener('input', handleNameInput);
  hideAllNotices();
};
