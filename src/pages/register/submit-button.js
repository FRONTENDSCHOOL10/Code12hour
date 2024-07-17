import { validateUsername, validatePassword, validateEmail } from './utils';
import { getSearchedAddress } from './address-search';

export const setupSubmitButton = (pb, inviteValidation) => {
  const submitButton = document.querySelector('.register__button');
  const requiredCheckboxes = ['terms', 'privacy', 'age'].map((id) => document.getElementById(id));

  if (!submitButton) {
    console.error('Submit button not found');
    return;
  }

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    // 필수 입력 항목 확인
    const userId = document.getElementById('userId')?.value;
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const birthdate = document.getElementById('birth-date')?.value;
    const promotion = document.getElementById('promotion')?.checked;

    const searchedAddress = getSearchedAddress();
    const addressDetail = document.getElementById('address-to-input')?.value;
    const fullAddress = `${searchedAddress} ${addressDetail}`.trim();

    if (!userId || !password || !confirmPassword || !name || !email || !searchedAddress) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    // 유효성 검사
    if (!validateUsername(userId)) {
      alert('아이디를 올바르게 입력해주세요.');
      return;
    }

    if (!validatePassword(password)) {
      alert('비밀번호를 올바르게 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!validateEmail(email)) {
      alert('이메일을 올바르게 입력해주세요.');
      return;
    }

    // 필수 약관 동의 확인
    if (!requiredCheckboxes.every((cb) => cb && cb.checked)) {
      alert('필수 이용 약관에 동의해 주세요.');
      return;
    }

    // 아침 배송 가능 도시 확인
    const morningDeliveryCities = ['거제시', '영주시', '서울특별시', '안성시'];
    const isMorningDeliveryAvailable = morningDeliveryCities.some((city) =>
      searchedAddress.includes(city)
    );

    // 추천인과 이벤트명 가져오기
    const recommender = inviteValidation ? inviteValidation.getValidRecommender() : null;
    const eventName = inviteValidation ? inviteValidation.getValidEventName() : null;

    try {
      const userData = {
        username: userId,
        email: email,
        emailVisibility: true,
        password: password,
        passwordConfirm: confirmPassword,
        name: name,
        address: fullAddress,
        gender: gender || 'not_specified',
        birthdate: birthdate || null,
        promotionAgreed: promotion || false,
        morning_delivery: isMorningDeliveryAvailable,
        recommender: recommender,
        event_name: eventName,
        ad_consent: promotion,
      };

      console.log('Sending user data:', userData);

      const user = await pb.collection('users').create(userData);

      // 이메일 인증 요청 추가
      try {
        await pb.collection('users').requestVerification(email);
        console.log('인증 이메일이 전송되었습니다.');
      } catch (verificationError) {
        console.error('이메일 인증 요청 중 오류 발생:', verificationError);
      }

      alert(
        `환영합니다! ${user.name}님 가입을 진심으로 축하드립니다! 이메일로 전송된 인증 링크를 확인해 주세요.`
      );

      window.location.href = 'https://code12hour.netlify.app/src/pages/login/';
    } catch (error) {
      console.error('Registration error:', error);
      if (error.data) {
        console.error('Error details:', error.data);
      }
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });
};
