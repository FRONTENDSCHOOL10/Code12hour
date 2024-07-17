/**
 * 추가 정보 입력 옵션 관련 기능을 설정합니다.
 */
export const setupAddOptions = () => {
  const elements = {
    addInfoFriend: document.getElementById('addInfoFriend'),
    addInfoEvent: document.getElementById('addInfoEvent'),
    inviteRecommenderGroup: document.getElementById('invite-recommender-group'),
    inviteEventnameGroup: document.getElementById('invite-eventname-group'),
    inviteRecommenderInput: document.getElementById('invite-recommender'),
    inviteEventnameInput: document.getElementById('invite-eventname'),
  };

  /**
   * 선택된 옵션에 따라 입력 필드의 가시성을 토글합니다.
   */
  const toggleVisibility = () => {
    if (elements.addInfoFriend.checked) {
      showRecommenderField();
    } else if (elements.addInfoEvent.checked) {
      showEventField();
    } else {
      hideAllFields();
    }
  };

  /**
   * 추천인 입력 필드를 표시하고 이벤트명 필드를 숨깁니다.
   */
  const showRecommenderField = () => {
    elements.inviteRecommenderGroup.style.display = 'flex';
    elements.inviteEventnameGroup.style.display = 'none';
    clearInput(elements.inviteEventnameInput);
  };

  /**
   * 이벤트명 입력 필드를 표시하고 추천인 필드를 숨깁니다.
   */
  const showEventField = () => {
    elements.inviteRecommenderGroup.style.display = 'none';
    elements.inviteEventnameGroup.style.display = 'flex';
    clearInput(elements.inviteRecommenderInput);
  };

  /**
   * 모든 추가 정보 입력 필드를 숨깁니다.
   */
  const hideAllFields = () => {
    elements.inviteRecommenderGroup.style.display = 'none';
    elements.inviteEventnameGroup.style.display = 'none';
    clearInput(elements.inviteRecommenderInput);
    clearInput(elements.inviteEventnameInput);
  };

  /**
   * 입력 필드의 값을 초기화합니다.
   * @param {HTMLInputElement} input - 초기화할 입력 필드
   */
  const clearInput = (input) => {
    if (!input.disabled) {
      input.value = '';
    }
  };

  // 초기 가시성 설정
  toggleVisibility();

  // 이벤트 리스너 추가
  elements.addInfoFriend.addEventListener('change', toggleVisibility);
  elements.addInfoEvent.addEventListener('change', toggleVisibility);
};

// DOM이 로드된 후 설정 함수 실행
document.addEventListener('DOMContentLoaded', setupAddOptions);
