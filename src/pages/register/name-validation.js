export const setupNameValidation = () => {
  const nameInput = document.getElementById('name');
  const nameNotice1 = document.getElementById('nameNotice-1');
  const nameNotice2 = document.getElementById('nameNotice-2');

  const showNotice = (notice) => {
    notice.style.display = '';
  };

  const hideNotice = (notice) => {
    notice.style.display = 'none';
  };

  const hideAllNotices = () => {
    hideNotice(nameNotice1);
    hideNotice(nameNotice2);
  };

  const isValidName = (name) => {
    // 완성된 한글 또는 영문만 허용하는 정규식 (공백 제외)
    const regex = /^[가-힣a-zA-Z]+$/;
    return regex.test(name);
  };

  nameInput.addEventListener('input', () => {
    // 모든 공백 제거
    const name = nameInput.value.replace(/\s/g, '');

    // 공백이 제거된 값을 다시 입력 필드에 설정
    nameInput.value = name;

    if (name === '') {
      showNotice(nameNotice1);
      hideNotice(nameNotice2);
    } else if (!isValidName(name)) {
      hideNotice(nameNotice1);
      showNotice(nameNotice2);
    } else {
      hideAllNotices();
    }
  });

  // 페이지 로드 시 초기 상태 설정
  hideAllNotices();
};
