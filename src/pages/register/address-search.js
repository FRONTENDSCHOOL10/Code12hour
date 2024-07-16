let addressInput;
let addressToInput;

export const setupAddressSearch = () => {
  const addressSearchButton = document.getElementById('address-button');
  addressInput = document.getElementById('address-input');
  addressToInput = document.getElementById('address-to-input');

  // 페이지 로드 시 저장된 주소 정보 복원 (검색 결과만)
  const savedAddress = sessionStorage.getItem('searchedAddress');
  if (savedAddress) addressInput.value = savedAddress;

  addressSearchButton.addEventListener('click', () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data) {
          let addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
          let extraAddr = '';

          if (data.userSelectedType === 'R') {
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }
            if (data.buildingName !== '' && data.apartment === 'Y') {
              extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
            }
            if (extraAddr !== '') {
              extraAddr = ' (' + extraAddr + ')';
            }
          }

          let searchedAddress = `(${data.zonecode}) ${addr} ${extraAddr}`;

          if (data.userSelectedType === 'R') {
            searchedAddress += data.buildingName !== '' ? `, ${data.buildingName}` : '';
          }

          if (data.autoJibunAddress) {
            searchedAddress += ` (지번: ${data.autoJibunAddress})`;
          }

          addressInput.value = searchedAddress;
          sessionStorage.setItem('searchedAddress', searchedAddress);
        },
      }).open();
    } else {
      alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    }
  });
};

export const getSearchedAddress = () => {
  if (!addressInput || !addressToInput) {
    console.error('Address inputs are not initialized');
    return '';
  }
  return `${addressInput.value} ${addressToInput.value}`.trim();
};
