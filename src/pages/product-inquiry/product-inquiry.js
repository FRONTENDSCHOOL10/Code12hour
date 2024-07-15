import './product-inquiry.scss';
import '../../components/modal/modal.scss';

document.addEventListener('DOMContentLoaded', () => {
  // 후기 작성하기 버튼 클릭 => 모달창 열림
  const writeInquiryButton = document.querySelector('.product-inquiry__write-btn');
  const modalTemplate = document.getElementById('modal-template');

  function openModal() {
    const inquiryModal = modalTemplate.content.cloneNode(true);
    document.body.appendChild(inquiryModal);

    const modal = document.body.lastElementChild;
    modal.style.display = 'flex';

    const closeButton = modal.querySelector('.modal__close-btn');
    const cancelButton = modal.querySelector('.modal__button--cancel');

    // 닫기, 취소 버튼 클릭 => 모달창 닫힘
    function closeModal() {
      modal.style.display = 'none';
      modal.remove();
    }

    closeButton.addEventListener('click', closeModal);
    cancelButton.addEventListener('click', closeModal);

    // textarea 클릭 시 placeholder 사라지고 포커스 해제 시 나타남
    const contentTextarea = document.getElementById('modalContent');
    const placeholder = document.querySelector('.modal__textarea-placeholder');

    placeholder.addEventListener('click', function () {
      placeholder.style.display = 'none';
      contentTextarea.focus();
    });

    contentTextarea.addEventListener('focus', () => {
      placeholder.style.display = 'none';
    });

    contentTextarea.addEventListener('blur', () => {
      if (contentTextarea.value.trim() === '') {
        placeholder.style.display = 'block';
      }
    });

    // textarea 현재 입력 텍스트 카운터수
    const charCountCurrent = modal.querySelector('.modal__char-count-current');

    function charCountState() {
      const currentLength = contentTextarea.value.length;
      charCountCurrent.textContent = currentLength.toLocaleString();
    }
    contentTextarea.addEventListener('input', charCountState);

    // 제목과 내용이 작성될 시 등록 버튼에 배경색(primary-color) 변경
    const titleInput = document.getElementById('modalTitle');
    const submitButton = modal.querySelector('.modal__button--submit');

    function checkInputs() {
      if (titleInput.value.trim() !== '' && contentTextarea.value.trim() !== '') {
        submitButton.classList.add('active');
        submitButton.removeAttribute('disabled');
        submitButton.setAttribute('aria-disbled', 'false');
      } else {
        submitButton.classList.remove('active');
        submitButton.setAttribute('disabled', '');
        submitButton.setAttribute('aria-disabled', 'true');
      }
    }

    contentTextarea.addEventListener('input', checkInputs);

    // 제출 버튼 클릭 시 문의 추가됨
    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (contentTextarea.value.trim() !== '') {
        addReview(contentTextarea.value);
        closeModal();
      }
    });
  }

  // 문의 innerHTML
  function addReview(title, content) {
    const inquiryList = document.querySelector('.inquiry-wrapper');
    const newInquiry = document.createElement('div');
    newInquiry.className = 'inquiry-area';

    const currentDate = new Date();
    const writtenDate = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`;

    newInquiry.innerHTML = `
  <details id="inqiry-list-1" class="inquiry-list" aria-expanded="false">
  <summary class="inquiry-list__summary">
    <span class="inquiry-list__item">
      <h3 class="inquiry-list__title">${title}</h3>
    </span>
    <span class="inquiry-list__item">야호</span>
    <span class="inquiry-list__item">${writtenDate}</span>
    <span class="inquiry-list__item">
      <span class="inquiry-list__item">답변대기</span>
      <!-- <span class="inquiry-list__item item-status__ture">답변완료</span> -->
    </span>
  </summary>
  <div class="inquiry-list__content">
    <div class="inquiry-list__content-message">
      <span class="inquiry-list__content-icon--q"></span>
      <p class="inquiry-list__content-message--question">${content}</p>
    </div>
    <div class="inquiry-list__content-message">
      <span class="inquiry-list__content-icon--a"></span>
      <div class="inquiry-list__content-message--wrapper">
        <p class="inquiry-list__content-message--answer">답변답변답변</p>
        <span
          class="inquiry-list__content-message--answer inquiry-list__content-message--date"
          >${writtenDate}</span
        >
      </div>
    </div>
  </div>
</details>
  `;

    // 새 리뷰를 리스트의 맨 위에 추가
    inquiryList.insertBefore(newInquiry, inquiryList.firstChild);
  }

  writeInquiryButton.addEventListener('click', openModal);
});
