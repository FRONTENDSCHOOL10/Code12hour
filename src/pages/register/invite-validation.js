export const setupInviteValidation = (pb) => {
  const recommenderInput = document.getElementById('invite-recommender');
  const recommenderButton = recommenderInput.nextElementSibling;
  const eventnameInput = document.getElementById('invite-eventname');
  const eventnameButton = eventnameInput.nextElementSibling;

  let validRecommender = null;
  let validEventName = null;

  const disableInput = (input, button) => {
    input.disabled = true;
    button.disabled = true;
    button.style.borderColor = '#a6a6a6';
    button.querySelector('.register-form__button-text').style.color = '#a6a6a6';
  };

  recommenderButton.addEventListener('click', async () => {
    const recommender = recommenderInput.value.trim();
    if (!recommender) {
      alert('추천인 아이디를 입력해주세요.');
      return;
    }

    try {
      const result = await pb.collection('users').getList(1, 1, {
        filter: `username = "${recommender}"`,
      });

      if (result.items.length > 0) {
        alert('추천인이 확인되었습니다.');
        validRecommender = recommender;
        disableInput(recommenderInput, recommenderButton);
      } else {
        alert('유효하지 않은 추천인입니다.');
        validRecommender = null;
      }
    } catch (error) {
      console.error('Recommender check error:', error);
      alert('추천인 확인 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  eventnameButton.addEventListener('click', async () => {
    const eventName = eventnameInput.value.trim();
    if (!eventName) {
      alert('이벤트명을 입력해주세요.');
      return;
    }

    alert('이벤트 참여가 확인되었습니다.');
    validEventName = eventName;
    disableInput(eventnameInput, eventnameButton);
  });

  return {
    getValidRecommender: () => validRecommender,
    getValidEventName: () => validEventName,
  };
};
