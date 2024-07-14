import './product-review.scss';
import '../../components/modal/modal.scss';

document.addEventListener('DOMContentLoaded', () => {
  // 후기 작성하기 버튼 클릭 => 모달창 열림
  const writeReviewButton = document.querySelector('.product-reviews__write-btn');
  const modalTemplate = document.getElementById('modal-template');

  function openModal() {
    const reviewModal = modalTemplate.content.cloneNode(true);
    document.body.appendChild(reviewModal);

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

    // 제목과 내용이 작성될 시 등록 버튼에 배경색(primary-color) 변경 => 리뷰의 경우 제목이 필요 없을 듯
    const submitButton = modal.querySelector('.modal__button--submit');

    function checkInputs() {
      if (contentTextarea.value.trim() !== '') {
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

    // 제출 버튼 클릭 시 후기 추가됨
    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (contentTextarea.value.trim() !== '') {
        addReview(contentTextarea.value);
        closeModal();
      }
    });
  }

  // 후기 innerHTML
  function addReview(content) {
    const reviewList = document.querySelector('.review-list');
    const newReview = document.createElement('article');
    newReview.className = 'review-article__list';

    const currentDate = new Date();
    const writtenDate = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`;

    newReview.innerHTML = `
    <article class="review-article__list" aria-labelledby="고객 후기">
    <div class="review-article__list-area">
      <div class="review-item">
        <div class="review-item__user">
          <span class="review-item__badge">베스트</span>
          <span class="review-item__author">사용자</span>
        </div>
      </div>
      <!-- 후기 contents -->
      <article class="review">
        <span class="review__product-name" aria-label="리뷰 대상 제품:">
          [풀무원] 탱탱쫄면 (4개입)
        </span>
        <p class="review__text">${content}</p>
        <!-- 사용자 리뷰 이미지 -->
        <div class="review__gallery">
          <button
            type="button"
            class="review__image-btn"
            aria-label="리뷰 썸네일 이미지 1 크게 보기"
          >
            <img src="" alt="리뷰 썸네일 이미지 1" loading="lazy" />
          </button>
          <button
            type="button"
            class="review__image-btn"
            aria-label="리뷰 썸네일 이미지 2 크게 보기"
          >
            <img src="" alt="리뷰 썸네일 이미지 2" loading="lazy" />
          </button>
          <button
            type="button"
            class="review__image-btn"
            aria-label="리뷰 썸네일 이미지 3 크게 보기"
          >
            <img src="" alt="리뷰 썸네일 이미지 3" loading="lazy" />
          </button>
          <button
            type="button"
            class="review__image-btn"
            aria-label="리뷰 썸네일 이미지 4 크게 보기"
          >
            <img src="" alt="리뷰 썸네일 이미지 4" loading="lazy" />
          </button>
          <button
            type="button"
            class="review__image-btn"
            aria-label="리뷰 썸네일 이미지 5 크게 보기"
          >
            <img src="" alt="리뷰 썸네일 이미지 5" loading="lazy" />
          </button>
        </div>
        <!-- 후기란 푸터 -->
        <footer class="review__footer">
          <time class="review__date" datetime="2024-07-08">${writtenDate}</time>
          <button
            type="button"
            class="review__helpful-btn"
            aria-pressed="false"
            aria-label="이 리뷰가 도움이 되었습니다. 현재 10명이 도움이 되었다고 평가했습니다."
          >
            <span class="review__helpful-btn-icon" aria-hidden="true"></span>
            <span class="review__helpful-btn-text">도움돼요 0</span>
          </button>
        </footer>
      </article>
    </div>
  </article>
    `;

    // 새 리뷰를 리스트의 맨 위에 추가
    reviewList.insertBefore(newReview, reviewList.firstChild);

    // 리뷰가 추가 -> '따끈따끈한 후기를 기다리고 있어요' display none
    const emptyReviewMessage = document.querySelector('.review-list__empty');
    if (emptyReviewMessage) {
      emptyReviewMessage.style.display = 'none';
    }

    // 리뷰 개수 업데이트
    updateReviewCount();
  }

  // 리뷰 개수 업데이트 함수
  function updateReviewCount() {
    const reviewCountElement = document.getElementById('review-count');
    const currentCount = parseInt(reviewCountElement.textContent);
    const countUp = currentCount + 1;
    reviewCountElement.textContent = countUp.toLocaleString();
  }

  writeReviewButton.addEventListener('click', openModal);
});

// 필수적으로 구현해야 할 기능 *****
// 추천순, 최근 등록순 필터링 버튼 구현 -> 서버에서 정렬순으로 호출?
// 후기 이미지, 내용, 사용자 이름, 날짜, 상품명 데이터 받아올 수 있게끔 변수 처리
// 모달창 -> 상품 인포 내용(이미지, 상품명) 데이터 받아올 수 있게끔 변수 처리

// 부가 기능
// 300자 이상 후기 -> 베스트 아이콘 보이게
// 상품 후기의 도움돼요 버튼 클릭시 액티브 스타일링 고정 + 카운트 수 업데이트
// 상품 이미지 갤러리 클릭 시 크게 보기? -> 선택 사항 (마크업 추가해야 함)

// 문제점
// 모달창 -> 현재 텍스트 카운트 수 부분 텍스트 많아지면 시각적으로 잘 안 보이는 문제점 있음
