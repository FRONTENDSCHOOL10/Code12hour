// 모달 관련 함수
const showModal = (title, message) => {
  const modal = document.querySelector('c-modal');
  const titleElement = modal.querySelector('.register-modal__title');
  const bodyElement = modal.querySelector('.register-modal__body');

  if (titleElement) titleElement.textContent = title;
  if (bodyElement) bodyElement.textContent = message;

  modal.showModal();
};

export const setupInviteValidation = (pb) => {
  const elements = {
    recommenderInput: document.getElementById('invite-recommender'),
    recommenderButton: document.getElementById('invite-recommender').nextElementSibling,
    eventnameInput: document.getElementById('invite-eventname'),
    eventnameButton: document.getElementById('invite-eventname').nextElementSibling,
  };

  let recommender = null;
  let eventName = null;

  const disableInput = (input, button) => {
    input.disabled = button.disabled = true;
    button.style.borderColor = '#a6a6a6';
    button.querySelector('.register-form__button-text').style.color = '#a6a6a6';
  };

  const handleRecommenderValidation = async () => {
    const inputRecommender = elements.recommenderInput.value.trim();
    if (!inputRecommender) {
      showModal('알림', '추천인 아이디를 입력해주세요.');
      return;
    }

    try {
      const result = await pb.collection('users').getList(1, 1, {
        filter: `username = "${inputRecommender}"`,
      });

      if (result.items.length > 0) {
        showModal('알림', '추천인이 확인되었습니다.');
        recommender = inputRecommender;
        disableInput(elements.recommenderInput, elements.recommenderButton);
      } else {
        showModal('알림', '유효하지 않은 추천인입니다.');
        recommender = null;
      }
    } catch (error) {
      console.error('Recommender check error:', error);
    }
  };

  const handleEventNameValidation = () => {
    const inputEventName = elements.eventnameInput.value.trim();
    if (!inputEventName) {
      showModal('알림', '이벤트명을 입력해주세요.');
      return;
    }
    showModal('알림', '이벤트 참여가 확인되었습니다.');
    eventName = inputEventName;
    disableInput(elements.eventnameInput, elements.eventnameButton);
  };

  elements.recommenderButton.addEventListener('click', handleRecommenderValidation);
  elements.eventnameButton.addEventListener('click', handleEventNameValidation);

  return {
    getRecommender: () => recommender,
    getEventName: () => eventName,
  };
};
