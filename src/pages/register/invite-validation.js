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
    input.disabled = true;
    button.disabled = true;
    button.style.borderColor = '#a6a6a6';
    button.querySelector('.register-form__button-text').style.color = '#a6a6a6';
  };

  elements.recommenderButton.addEventListener('click', async () => {
    const inputRecommender = elements.recommenderInput.value.trim();
    if (!inputRecommender) {
      alert('추천인 아이디를 입력해주세요.');
      return;
    }

    try {
      const result = await pb.collection('users').getList(1, 1, {
        filter: `username = "${inputRecommender}"`,
      });

      if (result.items.length > 0) {
        alert('추천인이 확인되었습니다.');
        recommender = inputRecommender;
        disableInput(elements.recommenderInput, elements.recommenderButton);
      } else {
        alert('유효하지 않은 추천인입니다.');
        recommender = null;
      }
    } catch (error) {
      console.error('Recommender check error:', error);
      alert('추천인 확인 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  elements.eventnameButton.addEventListener('click', () => {
    const inputEventName = elements.eventnameInput.value.trim();
    if (!inputEventName) {
      alert('이벤트명을 입력해주세요.');
      return;
    }

    alert('이벤트 참여가 확인되었습니다.');
    eventName = inputEventName;
    disableInput(elements.eventnameInput, elements.eventnameButton);
  });

  return {
    getRecommender: () => recommender,
    getEventName: () => eventName,
  };
};
