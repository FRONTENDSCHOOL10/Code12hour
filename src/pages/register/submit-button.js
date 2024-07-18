import { validateUsername, validatePassword, validateEmail } from './utils';
import { getSearchedAddress } from './address-search';

// 모달 관련 함수
const showModal = (title, message) => {
  const modal = document.querySelector('c-modal');
  const titleElement = modal.querySelector('.register-modal__title');
  const bodyElement = modal.querySelector('.register-modal__body');

  if (titleElement) titleElement.textContent = title;
  if (bodyElement) bodyElement.textContent = message;

  modal.showModal();
};

export const setupSubmitButton = (pb) => {
  const submitButton = document.querySelector('.register__button');
  const requiredCheckboxes = ['terms', 'privacy', 'age'].map((id) => document.getElementById(id));

  if (!submitButton) {
    console.error('Submit button not found');
    return;
  }

  const getFormData = () => ({
    userId: document.getElementById('userId')?.value,
    password: document.getElementById('password')?.value,
    confirmPassword: document.getElementById('confirmPassword')?.value,
    name: document.getElementById('name')?.value,
    email: document.getElementById('email')?.value,
    gender: document.querySelector('input[name="gender"]:checked')?.value,
    birthdate: document.getElementById('birth-date')?.value,
    promotion: document.getElementById('promotion')?.checked,
    recommender: document.getElementById('invite-recommender')?.value,
    eventName: document.getElementById('invite-eventname')?.value,
    addressDetail: document.getElementById('address-to-input')?.value,
  });

  const validateFormData = (formData) => {
    if (
      !formData.userId ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.name ||
      !formData.email ||
      !getSearchedAddress()
    ) {
      showModal('알림', '모든 필수 항목을 입력해주세요.');
    }
    if (!validateUsername(formData.userId)) showModal('알림', '아이디를 올바르게 입력해주세요.');
    if (!validatePassword(formData.password))
      showModal('알림', '비밀번호를 올바르게 입력해주세요.');
    if (formData.password !== formData.confirmPassword)
      showModal('알림', '비밀번호가 일치하지 않습니다.');
    if (!validateEmail(formData.email)) showModal('알림', '이메일을 올바르게 입력해주세요.');
    if (!requiredCheckboxes.every((cb) => cb && cb.checked))
      showModal('알림', '필수 이용 약관에 동의해 주세요.');
  };

  const isMorningDeliveryAvailable = (address) => {
    const morningDeliveryCities = ['거제', '영주', '서울', '안성'];
    return morningDeliveryCities.some((city) => address.includes(city));
  };

  const createUserData = (formData) => {
    const searchedAddress = getSearchedAddress();
    const fullAddress = `${searchedAddress} ${formData.addressDetail}`.trim();
    return {
      username: formData.userId,
      email: formData.email,
      emailVisibility: true,
      password: formData.password,
      passwordConfirm: formData.confirmPassword,
      name: formData.name,
      address: fullAddress,
      gender: formData.gender || 'not_specified',
      birthdate: formData.birthdate || null,
      promotionAgreed: formData.promotion || false,
      morning_delivery: isMorningDeliveryAvailable(searchedAddress),
      recommender: formData.recommender,
      event_name: formData.eventName,
      ad_consent: formData.promotion,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = getFormData();
      validateFormData(formData);
      const userData = createUserData(formData);
      const user = await pb.collection('users').create(userData);
      await pb.collection('users').requestVerification(formData.email);

      showModal(
        '환영합니다!',
        `${user.name}님 가입을 진심으로 축하드립니다! 이메일로 전송된 인증 링크를 확인해 주세요.`
      );

      setTimeout(() => {
        window.location.href = '/src/pages/register/';
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      if (error.data) console.error('Error details:', error.data);
    }
  };

  submitButton.addEventListener('click', handleSubmit);
};
