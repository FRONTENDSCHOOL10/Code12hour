import './product-inquiry.scss';
import '@/components/modal/modal.scss';
import css from './product-inquiry.scss?inline';
import css2 from '@/components/modal/modal.scss?inline';

/* document.addEventListener('DOMContentLoaded', () => {
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
}); */

const inquiryTemplate = document.createElement('template');
inquiryTemplate.innerHTML = `
    <style>${css}${css2}</style>
    <section class="product-inquiry">
      <!-- 문의 작성 버튼 및 안내 사항 -->
      <div class="product-inquiry__info" aria-labelledby="benefits-title">
        <h2 id="product-inquiry__title" class="product-inquiry__title">상품문의</h2>
        <!-- 문의 작성하기 버튼 -->
        <button type="button" class="product-inquiry__write-btn" aria-haspopup="dialog">
          문의하기
        </button>
        <template id="modal-template">
          <!-- modal__overlay  -->
          <div class="modal__overlay">
            <dialog
              id="modal-content"
              class="modal__content"
              role="dialog"
              aria-labelledby="modal-title"
            >
              <div class="modal__header">
                <h2 class="modal__title">상품 문의하기</h2>
                <button
                  class="modal__close-btn"
                  type="button"
                  aria-label="문의 작성창 닫기"
                ></button>
              </div>
              <!-- 상품 정보 (이미지, 상품명) -->
              <div class="modal__product">
                <img
                  class="modal__product-image"
                  src="/src/assets/images/modal/Frame 134.png"
                  alt="탱탱쫄면 상품 이미지"
                  loading="lazy"
                />
                <span class="modal__product-name">[풀무원] 탱탱쫄면 (4개입)</span>
              </div>
              <!-- 제목 입력 -->
              <form method="post" class="modal__form" id="modal__form">
                <fieldset>
                  <legend class="visually-hidden">문의작성</legend>
                  <div class="modal__form-group">
                    <label for="modalTitle" class="modal__form-label">제목</label>
                    <div class="modal__input-wrapper">
                      <input
                        class="modal__input"
                        type="text"
                        name="modal-title"
                        maxlength="30"
                        id="modalTitle"
                        placeholder="제목을 입력해 주세요."
                        aria-label="제목 입력"
                        aria-required="true"
                        required
                      />
                    </div>
                  </div>
                  <!-- 내용 입력 -->
                  <div class="modal__form-group">
                    <label for="modalContent" class="modal__form-label">내용</label>
                    <!-- <div class="modal__textarea-count"> -->
                    <span class="modal__form-char-count" aria-live="polite">
                      <span class="modal__char-count-current">0&nbsp;</span>
                      <span class="modal__char-count-limit">/ 5000</span>
                    </span>
                    <div class="modal__textarea-wrapper">
                      <textarea
                        class="modal__textarea"
                        name="reviewContent"
                        maxlength="5000"
                        id="modalContent"
                        aria-label="내용 입력"
                        aria-required="true"
                        required
                      ></textarea>
                      <!-- textarea-placeholder -->
                      <div class="modal__textarea-placeholder">
                        <div class="placeholder__text">
                          <strong>상품문의 작성 전 확인해 주세요</strong>
                          <ul>
                            <li>답변은 영업일 기준 2~3일 소요됩니다.</li>
                            <li>
                              해당 게시판의 성격과 다른 글은 사전동의 없이 담당 게시판으로 이동될 수
                              있습니다.
                            </li>
                            <li>
                              배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 마이칼리 내 1:1
                              문의에 남겨주세요.
                            </li>
                            <li>
                              일반 화장품을 기능성화장품의 효능효과가 있다는 내용을 통한 오인 표현
                            </li>
                          </ul>
                          <strong>제품</strong>
                          <ul>
                            <li>
                              입고일 : 품절 상품 입고 일이 확정된 경우, 섬네일에 기재되어 있습니다.
                              (종 모양을 클릭하여, 재입고 알림 설정 가능)
                            </li>
                            <li>
                              제품 상세정보 : 영양성분 및 함량, 용량, 보관 및 취급 방법 등 제품
                              정보는 상세이미지 또는 상세정보에서 확인 가능합니다.
                            </li>
                          </ul>
                          <strong>주문취소</strong>
                          <ul>
                            <li>배송 단계별로 주문취소 방법이 상이합니다.</li>
                            <li>
                              [입금확인] 단계 : [마이칼리 > 주문내역 상세페이지] 에서 직접 취소 가능
                            </li>
                            <li>[입금확인] 이후 단계 : 고객센터로 문의</li>
                            <li>
                              생산이 시작된 [상품 준비중] 이후에는 취소가 제한되는 점 고객님의 양해
                              부탁드립니다.
                            </li>
                            <li>
                              비회원은 모바일 App 또는 모바일 웹사이트에서 [마이칼리 > 비회원 주문
                              조회 페이지] 에서 취소가 가능합니다.
                            </li>
                            <li>일부 예약상품은 배송 3~4일 전에만 취소 가능합니다.</li>
                          </ul>
                          <p class="caution__text">
                            ※ 주문상품의 부분 취소는 불가능합니다. 전체 주문 취소 후 재구매
                            해주세요.
                          </p>
                          <strong>배송</strong>
                          <ul>
                            <li>주문 완료 후 배송 방법(샛별/택배)은 변경이 불가능합니다.</li>
                            <li>배송일 배송시간 지정은 불가능합니다. (예약배송 포함)</li>
                          </ul>
                          <p class="caution__text">
                            ※ 전화번호, 이메일, 주소, 계좌번호 등의 상세 개인정보가 문의 내용에
                            저장되지 않도록 주의해 주시기 바랍니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </form>
              <!-- 비밀글로 문의하기: 체크박스 -->
              <!-- 체크박스.svg -->
              <div class="modal__bottom">
                <div class="checkbox">
                  <label class="checkbox__label" for="privateInquiry">
                    <input type="checkbox" id="privateInquiry" class="checkbox__input sr-only" />
                    <span class="checkbox__icon"></span>
                    <span class="checkbox__text">비밀글로 문의하기</span>
                  </label>
                </div>
              </div>
              <!-- 취소, 확인 버튼 -->
              <div class="modal__actions">
                <button type="button" class="modal__button--cancel" aria-label="리뷰 작성 취소">
                  취소
                </button>
                <button
                  type="submit"
                  form="review-form"
                  class="modal__button--submit"
                  aria-label="리뷰 등록"
                  aria-disabled="true"
                  disabled
                >
                  등록
                </button>
              </div>
            </dialog>
          </div>
        </template>

        <div class="product-inquiry__benefits">
          <ul class="product-inquiry__benefit-list">
            <li class="product-inquiry__benefit-list-item">
              상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과 다른 글은 사전동의 없이
              담당 게시판으로 이동될 수 있습니다.
            </li>
            <li class="product-inquiry__benefit-list-item">
              배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 마이컬리 내 1:1 문의에
              남겨주세요.로부터 30일 이내 가능합니다.
            </li>
          </ul>
        </div>
      </div>

      <!-- 문의 영역 고정된 헤더 -->
      <div class="inquiry-board__header">
        <span class="inquiry-board__header-item">제목</span>
        <span class="inquiry-board__header-item">작성자</span>
        <span class="inquiry-board__header-item">작성일</span>
        <span class="inquiry-board__header-item">답변상태</span>
      </div>

      <!-- 문의 관련 공지 사항 -->
      <details id="inquiry-notice-1" class="inquiry-notice" aria-expanded="false">
        <summary class="inquiry-notice__summary">
          <span class="inquiry-notice__item">
            <span class="inquiry-notice__badge">공지</span>
            <h3 class="inquiry-notice__title">판매(일시)중단 제품 안내</h3>
          </span>
          <span class="inquiry-notice__item">칼리</span>
          <span class="inquiry-notice__item">2024.07.11</span>
          <span class="inquiry-notice__item">-</span>
        </summary>
        <div class="inquiry-notice__content-message">
          <p class="inquiry-notice__content-message--answer">답변답변답변</p>
        </div>
      </details>

      <!-- 문의 리스트 -->
      <div class="inquiry-wrapper">
        <div class="inquiry-area">
          <details id="inqiry-list-1" class="inquiry-list" aria-expanded="false">
            <summary class="inquiry-list__summary">
              <span class="inquiry-list__item">
                <h3 class="inquiry-list__title">팩이 터져서 왔어요!!!</h3>
              </span>
              <span class="inquiry-list__item">야호</span>
              <span class="inquiry-list__item">2024.07.11</span>
              <span class="inquiry-list__item">
                <span class="inquiry-list__item">답변대기</span>
                <!-- <span class="inquiry-list__item item-status__ture">답변완료</span> -->
              </span>
            </summary>
            <div class="inquiry-list__content">
              <div class="inquiry-list__content-message">
                <span class="inquiry-list__content-icon--q"></span>
                <p class="inquiry-list__content-message--question">질문질문질문</p>
              </div>
              <div class="inquiry-list__content-message">
                <span class="inquiry-list__content-icon--a"></span>
                <div class="inquiry-list__content-message--wrapper">
                  <p class="inquiry-list__content-message--answer">답변답변답변</p>
                  <span
                    class="inquiry-list__content-message--answer inquiry-list__content-message--date"
                    >2024.07.12</span
                  >
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>

      <!-- 비밀글입니다. -->
      <div id="" class="inquiry-private">
        <span class="inquiry-private__item">
          <span class="inquiry-private__message">비밀글입니다.</span>
          <span class="inquiry-private__icon"></span>
        </span>
        <span class="inquiry-private__item">이름</span>
        <span class="inquiry-private__item">2024.07.13</span>
        <span class="inquiry-private__item">
          <span class="inquiry-private__item">답변대기</span>
          <!-- <span class="inquiry-private__item item-status__ture">답변완료</span> -->
        </span>
      </div>
      <div id="" class="inquiry-private">
        <span class="inquiry-private__item">
          <span class="inquiry-private__message">비밀글입니다.</span>
          <span class="inquiry-private__icon"></span>
        </span>
        <span class="inquiry-private__item">이름</span>
        <span class="inquiry-private__item">2024.07.13</span>
        <span class="inquiry-private__item">
          <span class="inquiry-private__item">답변대기</span>
          <!-- <span class="inquiry-private__item item-status__ture">답변완료</span> -->
        </span>
      </div>
      <div id="" class="inquiry-private">
        <span class="inquiry-private__item">
          <span class="inquiry-private__message">비밀글입니다.</span>
          <span class="inquiry-private__icon"></span>
        </span>
        <span class="inquiry-private__item">이름</span>
        <span class="inquiry-private__item">2024.07.13</span>
        <span class="inquiry-private__item">
          <span class="inquiry-private__item">답변대기</span>
          <!-- <span class="inquiry-private__item item-status__ture">답변완료</span> -->
        </span>
      </div>
      <div id="" class="inquiry-private">
        <span class="inquiry-private__item">
          <span class="inquiry-private__message">비밀글입니다.</span>
          <span class="inquiry-private__icon"></span>
        </span>
        <span class="inquiry-private__item">이름</span>
        <span class="inquiry-private__item">2024.07.13</span>
        <span class="inquiry-private__item">
          <span class="inquiry-private__item">답변대기</span>
          <!-- <span class="inquiry-private__item item-status__ture">답변완료</span> -->
        </span>
      </div>
      <!-- 비밀글 팝업창 -->
      <!-- <div id="privatePostPopup" class="private-popup__overlay">
        <div class="private-popup__content" role="dialog" aria-labelledby="popupMessage">
          <p id="popupMessage" class="private-popup__message">비밀글입니다.</p>
          <button class="private-popup__button">확인</button>
        </div>
      </div> -->

      <!-- 페이지네이션 좌우 버튼 -->
      <nav class="paging" aria-label="문의 페이지 버튼">
        <button
          type="button"
          class="paging__button paging__button--prev"
          aria-label="이전 페이지"
        ></button>
        <button
          type="button"
          class="paging__button paging__button--next"
          aria-label="다음 페이지"
        ></button>
      </nav>
    </section>
`;

export class inquiry extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(inquiryTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.writeInquiryButton = this.shadowRoot.querySelector('.product-inquiry__write-btn');
    this.inquiryWrapper = this.shadowRoot.querySelector('.inquiry-wrapper');
    this.modalTemplate = this.shadowRoot.getElementById('modal-template');

    this.writeInquiryButton.addEventListener('click', () => this.openModal());
  }

  openModal() {
    const inquiryModal = this.modalTemplate.content.cloneNode(true);
    this.shadowRoot.appendChild(inquiryModal);

    const modal = this.shadowRoot.lastElementChild;
    modal.style.display = 'flex';

    const closeButton = modal.querySelector('.modal__close-btn');
    const cancelButton = modal.querySelector('.modal__button--cancel');
    const contentTextarea = modal.querySelector('#modalContent');
    const placeholder = modal.querySelector('.modal__textarea-placeholder');
    const charCountCurrent = modal.querySelector('.modal__char-count-current');
    const titleInput = modal.querySelector('#modalTitle');
    const submitButton = modal.querySelector('.modal__button--submit');

    closeButton.addEventListener('click', () => this.closeModal(modal));
    cancelButton.addEventListener('click', () => this.closeModal(modal));

    placeholder.addEventListener('click', () => {
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

    contentTextarea.addEventListener('input', () => {
      this.charCountState(contentTextarea, charCountCurrent);
      this.checkInputs(titleInput, contentTextarea, submitButton);
    });

    titleInput.addEventListener('input', () => {
      this.checkInputs(titleInput, contentTextarea, submitButton);
    });

    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (contentTextarea.value.trim() !== '') {
        this.addInquiry(titleInput.value, contentTextarea.value);
        this.closeModal(modal);
      }
    });
  }

  closeModal(modal) {
    modal.style.display = 'none';
    modal.remove();
  }

  charCountState(textarea, countElement) {
    const currentLength = textarea.value.length;
    countElement.textContent = currentLength.toLocaleString();
  }

  checkInputs(titleInput, contentTextarea, submitButton) {
    if (titleInput.value.trim() !== '' && contentTextarea.value.trim() !== '') {
      submitButton.classList.add('active');
      submitButton.removeAttribute('disabled');
      submitButton.setAttribute('aria-disabled', 'false');
    } else {
      submitButton.classList.remove('active');
      submitButton.setAttribute('disabled', '');
      submitButton.setAttribute('aria-disabled', 'true');
    }
  }

  addInquiry(title, content) {
    const newInquiry = document.createElement('div');
    newInquiry.className = 'inquiry-area';

    const currentDate = new Date();
    const writtenDate = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`;

    newInquiry.innerHTML = `
      <details id="inquiry-list-1" class="inquiry-list" aria-expanded="false">
        <summary class="inquiry-list__summary">
          <span class="inquiry-list__item">
            <h3 class="inquiry-list__title">${title}</h3>
          </span>
          <span class="inquiry-list__item">야호</span>
          <span class="inquiry-list__item">${writtenDate}</span>
          <span class="inquiry-list__item">
            <span class="inquiry-list__item">답변대기</span>
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
              <span class="inquiry-list__content-message--answer inquiry-list__content-message--date">${writtenDate}</span>
            </div>
          </div>
        </div>
      </details>
    `;

    this.inquiryWrapper.insertBefore(newInquiry, this.inquiryWrapper.firstChild);
  }
}