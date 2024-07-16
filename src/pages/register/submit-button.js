import { getSearchedAddress } from './address-search';

export const setupSubmitButton = (pb) => {
  const submitButton = document.querySelector('.register__button');

  if (!submitButton) {
    console.error('Submit button not found');
    return;
  }

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const userId = document.getElementById('userId')?.value;
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const birthdate = document.getElementById('birth-date')?.value;
    const promotion = document.getElementById('promotion')?.checked;

    const fullAddress = getSearchedAddress();

    if (!userId || !password || !confirmPassword || !name || !email || !fullAddress) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    try {
      const user = await pb.collection('users').create({
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
      });

      console.log('User created:', user);
      alert(`환영합니다! ${name}님 가입을 축하드립니다!`);

      window.location.href = 'https://code12hour.netlify.app/src/pages/login/';
    } catch (error) {
      console.error('Registration error:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });
};
