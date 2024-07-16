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
    const regex = /^[가-힣a-zA-Z]+$/;
    return regex.test(name);
  };

  nameInput.addEventListener('input', () => {
    const name = nameInput.value.replace(/\s/g, '');

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

  hideAllNotices();
};
