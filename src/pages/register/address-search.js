let searchedAddress = '';

export const setupAddressSearch = () => {
  const addressSearchButton = document.getElementById('address-button');
  const addressInput = document.getElementById('address-input');

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

          searchedAddress = `(${data.zonecode}) ${addr} ${extraAddr}`;

          if (data.userSelectedType === 'R') {
            searchedAddress += data.buildingName !== '' ? `, ${data.buildingName}` : '';
          }

          addressInput.value = searchedAddress;

          // 주소 업데이트 이벤트 발생
          const addressEvent = new CustomEvent('addressUpdated', {
            detail: { searchedAddress: searchedAddress },
          });
          document.dispatchEvent(addressEvent);
        },
      }).open();
    } else {
      alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    }
  });
};

export const getSearchedAddress = () => searchedAddress;
