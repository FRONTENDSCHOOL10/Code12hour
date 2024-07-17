import { validateUsername, validatePassword, validateEmail } from './utils';

export const setupSubmitButton = (pb, inviteValidation) => {
  const submitButton = document.querySelector('.register__button');
  const requiredCheckboxes = ['terms', 'privacy', 'age'].map((id) => document.getElementById(id));

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const userData = collectUserData();
    if (!validateUserData(userData)) return;
    if (!checkRequiredAgreements(requiredCheckboxes)) return;

    const { recommender, eventName } = getInviteInfo(inviteValidation);

    try {
      const morningDelivery = checkMorningDeliveryAvailability(userData.address);
      console.log('Morning Delivery Availability:', morningDelivery);

      const fullUserData = {
        ...userData,
        emailVisibility: true,
        recommender: recommender, // 수정된 부분
        event_name: eventName,
        ad_consent: userData.promotion,
      };

      const user = await pb.collection('users').create({
        ...fullUserData,
        recommender: recommender, // 명시적으로 추가
        event_name: eventName, // 명시적으로 추가
      });

      if (morningDelivery) {
        await updateMorningDelivery(user.id, pb);
      }

      alert(`환영합니다! ${user.name}님 가입을 축하드립니다!`);

      window.location.href = 'https://code12hour.netlify.app/src/pages/login/';
    } catch (error) {
      handleRegistrationError(error);
    }
  });
};

const collectUserData = () => {
  const addressInput = document.getElementById('address-input');
  const addressToInput = document.getElementById('address-to-input');
  const promotionCheckbox = document.getElementById('promotion');

  const address = `${addressInput.value} ${addressToInput.value}`.trim();
  console.log('Collected address:', address);

  return {
    username: document.getElementById('userId')?.value,
    email: document.getElementById('email')?.value,
    password: document.getElementById('password')?.value,
    passwordConfirm: document.getElementById('confirmPassword')?.value,
    name: document.getElementById('name')?.value,
    address: address,
    gender: document.querySelector('input[name="gender"]:checked')?.value || 'not_specified',
    birthdate: document.getElementById('birth-date')?.value || null,
    promotion: promotionCheckbox?.checked || false,
  };
};

const validateUserData = (userData) => {
  if (
    !userData.username ||
    !userData.password ||
    !userData.passwordConfirm ||
    !userData.name ||
    !userData.email ||
    !userData.address
  ) {
    alert('모든 필수 항목을 입력해주세요.');
    return false;
  }

  if (!validateUsername(userData.username)) {
    alert('아이디를 올바르게 입력해주세요.');
    return false;
  }

  if (!validatePassword(userData.password)) {
    alert('비밀번호를 올바르게 입력해주세요.');
    return false;
  }

  if (userData.password !== userData.passwordConfirm) {
    alert('비밀번호가 일치하지 않습니다.');
    return false;
  }

  if (!validateEmail(userData.email)) {
    alert('이메일을 올바르게 입력해주세요.');
    return false;
  }

  return true;
};

const checkRequiredAgreements = (requiredCheckboxes) => {
  if (!requiredCheckboxes.every((cb) => cb && cb.checked)) {
    alert('필수 이용 약관에 동의해 주세요.');
    return false;
  }
  return true;
};

const checkMorningDeliveryAvailability = (address) => {
  const morningDeliveryCities = ['서울', '영주', '거제', '안성'];
  const result = morningDeliveryCities.some((city) => address.includes(city));
  console.log('Morning delivery check:', address, result);
  return result;
};

const getInviteInfo = (inviteValidation) => {
  if (typeof inviteValidation === 'object' && inviteValidation !== null) {
    return {
      recommender:
        typeof inviteValidation.getValidRecommender === 'function'
          ? inviteValidation.getValidRecommender()
          : inviteValidation.validRecommender || null,
      eventName:
        typeof inviteValidation.getValidEventName === 'function'
          ? inviteValidation.getValidEventName()
          : inviteValidation.validEventName || null,
    };
  }
  return { recommender: null, eventName: null };
};

const handleRegistrationError = (error) => {
  console.error('회원가입 오류:', error);
  if (error.data) {
    console.error('오류 상세:', JSON.stringify(error.data, null, 2));
    if (error.data.email) {
      alert(`이메일 오류: ${error.data.email.message}`);
    } else if (error.data.username) {
      alert(`아이디 오류: ${error.data.username.message}`);
    } else {
      alert('회원가입 중 오류가 발생했습니다. 입력하신 정보를 다시 확인해주세요.');
    }
  } else {
    alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
};

const updateMorningDelivery = async (userId, pb) => {
  try {
    const updatedUser = await pb.collection('users').update(userId, { morning_delivery: true });
    console.log('Updated user with morning delivery:', JSON.stringify(updatedUser, null, 2));
  } catch (error) {
    console.error('Morning delivery update error:', error);
    alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
};
