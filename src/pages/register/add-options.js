document.addEventListener('DOMContentLoaded', () => {
  const addInfoFriend = document.getElementById('addInfoFriend');
  const addInfoEvent = document.getElementById('addInfoEvent');
  const inviteRecommenderGroup = document.getElementById('invite-recommender-group');
  const inviteEventnameGroup = document.getElementById('invite-eventname-group');
  const inviteRecommenderInput = document.getElementById('invite-recommender');
  const inviteEventnameInput = document.getElementById('invite-eventname');

  const toggleVisibility = () => {
    if (addInfoFriend.checked) {
      inviteRecommenderGroup.style.display = 'flex';
      inviteEventnameGroup.style.display = 'none';
      if (!inviteEventnameInput.disabled) {
        inviteEventnameInput.value = '';
      }
    } else if (addInfoEvent.checked) {
      inviteRecommenderGroup.style.display = 'none';
      inviteEventnameGroup.style.display = 'flex';
      if (!inviteRecommenderInput.disabled) {
        inviteRecommenderInput.value = '';
      }
    } else {
      inviteRecommenderGroup.style.display = 'none';
      inviteEventnameGroup.style.display = 'none';
      if (!inviteRecommenderInput.disabled) {
        inviteRecommenderInput.value = '';
      }
      if (!inviteEventnameInput.disabled) {
        inviteEventnameInput.value = '';
      }
    }
  };

  // 초기 상태 설정
  toggleVisibility();

  addInfoFriend.addEventListener('change', toggleVisibility);
  addInfoEvent.addEventListener('change', toggleVisibility);
});
