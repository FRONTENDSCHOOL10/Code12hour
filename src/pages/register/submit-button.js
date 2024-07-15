import { validateUsername, validatePassword, validateEmail } from './utils';

export const setupSubmitButton = () => {
  const submitButton = document.querySelector('.register__button');
  const requiredCheckboxes = ['terms', 'privacy', 'age'].map((id) => document.getElementById(id));

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    // 필수 입력 항목 확인
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address-input').value;

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

    if (!name) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!validateEmail(email)) {
      alert('이메일을 올바르게 입력해주세요.');
      return;
    }

    if (!address) {
      alert('주소를 입력해주세요.');
      return;
    }

    // 필수 약관 동의 확인
    if (!requiredCheckboxes.every((cb) => cb.checked)) {
      alert('필수 이용 약관에 동의해 주세요.');
      return;
    }

    // 모든 검증이 통과되면 가입 성공
    alert('회원가입에 성공하였습니다!');
    // 여기에 회원가입 성공 후의 로직을 추가할 수 있습니다.
    // 예: 서버에 데이터 전송, 로그인 페이지로 리다이렉트 등
  });
};
