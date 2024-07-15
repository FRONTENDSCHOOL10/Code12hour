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

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          let fullAddress = `(${data.zonecode}) ${addr} ${extraAddr}`;

          // 상세주소 정보가 있으면 추가한다.
          if (data.userSelectedType === 'R') {
            fullAddress += data.buildingName !== '' ? `, ${data.buildingName}` : '';
          }

          // 상세주소 정보를 추가한다.
          if (data.autoJibunAddress) {
            fullAddress += ` (지번: ${data.autoJibunAddress})`;
          }

          addressInput.value = fullAddress;
        },
      }).open();
    } else {
      alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    }
  });
};
