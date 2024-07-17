let addressInput;
let addressToInput;

/**
 * 주소 검색 기능을 설정합니다.
 */
export const setupAddressSearch = () => {
  const addressSearchButton = document.getElementById('address-button');
  addressInput = document.getElementById('address-input');
  addressToInput = document.getElementById('address-to-input');

  restoreSavedAddress();
  addressSearchButton.addEventListener('click', handleAddressSearch);
};

/**
 * 저장된 주소 정보를 복원합니다.
 */
const restoreSavedAddress = () => {
  const savedAddress = sessionStorage.getItem('searchedAddress');
  if (savedAddress) addressInput.value = savedAddress;
};

/**
 * 주소 검색 버튼 클릭 시 처리를 담당합니다.
 */
const handleAddressSearch = () => {
  if (window.daum && window.daum.Postcode) {
    new window.daum.Postcode({
      oncomplete: handleAddressComplete,
    }).open();
  } else {
    alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
  }
};

/**
 * 주소 검색 완료 시 처리를 담당합니다.
 */
const handleAddressComplete = (data) => {
  let addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
  let extraAddr = getExtraAddress(data);

  let searchedAddress = `(${data.zonecode}) ${addr} ${extraAddr}`;

  if (data.userSelectedType === 'R' && data.buildingName) {
    searchedAddress += `, ${data.buildingName}`;
  }

  if (data.autoJibunAddress) {
    searchedAddress += ` (지번: ${data.autoJibunAddress})`;
  }

  addressInput.value = searchedAddress;
  sessionStorage.setItem('searchedAddress', searchedAddress);
};

/**
 * 추가 주소 정보를 생성합니다.
 */
const getExtraAddress = (data) => {
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
  return extraAddr;
};

/**
 * 검색된 주소를 반환합니다.
 */
export const getSearchedAddress = () => {
  if (!addressInput || !addressToInput) {
    console.error('주소 입력 필드가 초기화되지 않았습니다.');
    return '';
  }
  return `${addressInput.value} ${addressToInput.value}`.trim();
};
