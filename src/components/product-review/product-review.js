import './product-review.scss';
import '@/components/modal/modal.scss';
import css from './product-review.scss?inline';
import css2 from '@/components/review-modal/modal.scss?inline';
import pb from '@/api/pocketbase';
import getImageUrl from '@/api/imageUrl';

const reviewTemplate = document.createElement('template');
reviewTemplate.innerHTML = `
    <style>${css}${css2}</style>
    <section class="product-reviews">
      <!-- 후기 작성 버튼 및 혜택 안내 -->
      <div class="product-reviews__info" aria-labelledby="benefits-title">
        <h2 id="product-reviews__title" class="product-reviews__title">상품후기</h2>
        <!-- 후기 작성하기 버튼 -->
        <button type="button" class="product-reviews__write-btn" aria-haspopup="dialog">
          후기 작성하기
        </button>
        <c-modal width="400px" height="190px">
        <h2 slot="header" class="review-modal__title">알림</h2>
        <span slot="body" class="review-modal__body">로그인이 필요합니다.</span>
        <button
        slot="footer"
        type="button"
        class="review-modal__close"
        aria-label="로그인 필요창 닫기"
      >
        닫기
      </button>
      </c-modal>
        <!-- 모달 템플릿 -->
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
                <h2 class="modal__title">후기 작성</h2>
                <button
                  class="modal__close-btn"
                  type="button"
                  aria-label="후기 작성창 닫기"
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
                  <legend class="visually-hidden">후기작성</legend>
                  <div class="modal__form-group"></div>
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
                        class="modal__textarea review__textarea"
                        name="reviewContent"
                        maxlength="5000"
                        id="modalContent"
                        aria-label="내용 입력"
                        aria-required="true"
                        required
                      ></textarea>
                      <!-- textarea-placeholder -->
                      <div class="modal__textarea-placeholder review__textarea-placeholder">
                        <div class="placeholder__text">
                          <p>
                            컬리는 믿을 수 있는 후기문화를 함께 만들어가고자 합니다. 식품 등의
                            표시광고에 대한 법률을 준수하고자 다음과 같은 부당한 상품평에 대해서는
                            별도 고지 없이 임시 대처, 비공개 전환, 삭제, 적립금 회수 등의 필요한
                            조치가 취해 질 수 있습니다.
                          </p>
                          <strong>후기 작성 시 유의사항</strong>
                          <ul>
                            <li>
                              개인의 주관적인 의견으로 인해 상품의 기능 및 효과에 대하여 오해의
                              소지가 있는 내용
                            </li>
                            <li>
                              식품/건강기능식품과 관련하여 질병의 예방 및 치료, 체중감량(다이어트)에
                              효능효과가 있다는 내용
                            </li>
                            <li>의약외품을 의약품으로 오인하게 하는 표현</li>
                            <li>
                              일반 화장품을 기능성화장품의 효능효과가 있다는 내용을 통한 오인 표현
                            </li>
                            <li>
                              생활화학제품을 본래 용도와 다르게 사용하는 내용 및 효능효과를 과장하는
                              내용
                            </li>
                            <li>
                              욕설, 폭력성, 음란성, 상업성 등의 게시물 또는 구매 상품과 무관하거나
                              반복되는 동일 단어나 문장을 사용하여 판매자나 다른 이용자의 후기
                              이용을 방해한다고 판단되는 경우
                            </li>
                            <li>
                              구매한 상품이 아닌 캡쳐 사진, 타인 사진 도용, 포장 박스, 퍼플박스,
                              구매 상품을 구분할 수 없는 전체 사진 등 상품과 관련 없는 이미지,
                              동영상을 사용한 경우
                            </li>
                            <li>
                              본인 또는 타인의 주민등록번호, (휴대)전화번호, 이메일 등 개인정보가
                              포함된 경우
                            </li>
                            <li>
                              그 밖에 상품평으로 인해 다른 회원 또는 제3자에게 피해가 가해질 내용
                            </li>
                          </ul>
                          <p class="caution__text">
                            ※ 작성된 글과 첨부된 멀티미디어 파일 등으로 이루어진 각 상품평은 개인의
                            의견을 반영하므로, 게시된 내용에 대한 모든 책임은 작성자에게 있습니다.
                            또한 비정상적인 방법을 통해 후기를 작성하고 적립금을 취득한 경우
                            작성자에 법적 책임의 소지가 있음을 알려드립니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </form>
              <div class="modal__bottom"></div>
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
        <div class="product-reviews__benefits">
          <p class="product-reviews__description">글후기 50원 적립금 혜택이 있어요.</p>
          <ul class="product-reviews__benefit-list">
            <li class="product-reviews__benefit-list-item">
              퍼플, 더퍼플은 2배 적립 (100원) / 주간 베스트 후기로 선정 시 5,000원 추가 적립
            </li>
            <li class="product-reviews__benefit-list-item">
              후기 작성은 배송완료일로부터 30일 이내 가능합니다.
            </li>
            <li class="product-reviews__benefit-list-item">
              작성하신 후기는 확인 후 적립금이 지급됩니다. (영업일 기준 평균 1~2일 소요)
            </li>
          </ul>
        </div>
      </div>

      <!-- 상품 리뷰 썸네일 이미지 갤러리 -->

      <!-- 리뷰 써머리 (리뷰 개수 및 분류 버튼) -->
      <div class="review-content" aria-labelledby="review-list-title">
        <div class="review-content__summary">
          <span class="review-content__count" aria-live="polite"
            >총 <span id="review-count">0</span>개</span
          >

          <div class="review-content__sort-list" role="tablist">
            <button
              type="button"
              class="review-content__sort-btn review-content__sort-btn--active"
              role="tab"
              aria-selected="true"
              aria-controls="recommended-panel"
              id="recommended-tab"
            >
              추천순
            </button>

            <span class="review-content__sort-divider" aria-hidden="true">|</span>
            <button
              type="button"
              class="review-content__sort-btn"
              role="tab"
              aria-selected="false"
              aria-controls="recent-panel"
              id="recent-tab"
            >
              최근등록순
            </button>
          </div>
        </div>

        <!-- 후기 관련 공지사항 -->
        <details id="reveiw-notice-1" class="review-notice" aria-expanded="false">
          <summary class="review-notice__item">
            <span class="review-notice__icon" aria-hidden="true">공지</span>
            <h3 class="review-notice__title">금주의 베스트 후기 안내</h3>
          </summary>
          <div id="notice-content-1" class="review-notice__content">
            <p>공지사항 안내</p>
          </div>
        </details>
        <details id="reveiw-notice-2" class="review-notice" aria-expanded="false">
          <summary class="review-notice__item">
            <span class="review-notice__icon" aria-hidden="true">공지</span>
            <h3 class="review-notice__title">상품 후기 적립금 정책 안내</h3>
          </summary>
          <div id="notice-content-1" class="review-notice__content">
            <p>공지사항 안내</p>
          </div>
        </details>

        <!-- 상품 후기 리스트-->
        <!-- 후기가 없을 경우 -->
        <div class="review-list__empty" aria-hidden="true">
          <span class="review-list__empty-icon" aria-hidden="true"></span>
          <span class="review-list__empty-message">따끈따끈한 후기를 기다리고 있어요.</span>
        </div>

        <div class="review-list" aria-live="polite">
          <!-- 후기 아티클 -->
          <article class="review-article__list" aria-labelledby="고객 후기"></article>
        </div>

        <!-- 페이지네이션 좌우 버튼 -->
        <nav class="paging" aria-label="후기 페이지 버튼">
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
      </div>
    </section>
`;

export class review extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(reviewTemplate.content.cloneNode(true));

    this.currentPage = 1;
    this.perPage = 10;
    this.sortOption = 'recommended';

    this.initElements();
  }

  // DOM 요소 초기화
  initElements() {
    const selectors = {
      writeReviewButton: '.product-reviews__write-btn',
      modal: 'c-modal',
      modalTemplate: '#modal-template',
      modalCloseBtn: '.review-modal__close',
      reviewList: '.review-list',
      emptyReview: '.review-list__empty',
      reviewCountElement: '#review-count',
      recommendedTab: '#recommended-tab',
      recentTab: '#recent-tab',
      prevButton: '.paging__button--prev',
      nextButton: '.paging__button--next',
    };

    this.elements = Object.entries(selectors).reduce((acc, [key, selector]) => {
      if (key === 'menuLists' || key === 'menuItems') {
        acc[key] = this.shadowRoot.querySelectorAll(selector);
      } else {
        acc[key] = this.shadowRoot.querySelector(selector);
      }
      return acc;
    }, {});
  }

  connectedCallback() {
    this.setupEventListeners();
    this.renderReview(this.sortOption);
  }

  setupEventListeners() {
    this.elements.writeReviewButton.addEventListener('click', () => {
      const auth = JSON.parse(localStorage.getItem('auth') || '{}');
      const isAuth = auth.isAuth;

      if (isAuth) {
        this.openReviewModal();
      } else {
        this.elements.modal.showModal();
      }
    });

    this.elements.modalCloseBtn.addEventListener('click', () => {
      this.elements.modal.close();
    });

    this.elements.recommendedTab.addEventListener('click', () => {
      this.updateTabs('recommended');
      this.currentPage = 1;
      this.renderReview('recommended');
    });
    this.elements.recentTab.addEventListener('click', () => {
      this.updateTabs('recent');
      this.currentPage = 1;
      this.perPage = 10;
      this.renderReview('recent');
    });

    this.elements.prevButton.addEventListener('click', () => this.prevPage());
    this.elements.nextButton.addEventListener('click', () => this.nextPage());
  }

  // 현재 페이지의 상품 id
  currentProductId() {
    const params = new URLSearchParams(location.search);
    const productId = params.get('id');
    return productId;
  }

  // 리뷰 렌더링 (추천순 - 기본값 / 등록순)
  async renderReview(sortType) {
    try {
      const productId = this.currentProductId();
      const sortOption = sortType === 'recommended' ? '-recommendCount, -created' : '-created';
      let queryOptions = {
        sort: sortOption,
        page: this.currentPage,
        perPage: this.perPage,
        expand: 'user, product',
        filter: `product="${productId}"`,
      };

      const reviewData = await pb.collection('product_review').getList(1, 10, queryOptions);
      this.updateReviewList(reviewData);
      this.updateTabs(sortType);
      this.updatePaginationButton(reviewData.totalItems);
      this.sortOption = sortType;
    } catch (error) {
      console.error(error.data);
    }
  }

  // 리뷰 작성
  async addReview(content) {
    try {
      const productId = this.currentProductId();
      const authUser = await pb.authStore.model;
      const data = {
        user: authUser.id,
        product: productId,
        review_content: content,
        recommendCount: 0,
      };

      await pb.collection('product_review').create(data);
      await this.renderReview();
    } catch (error) {
      console.error(error);

      if (error.message) {
        console.error(error.message);
      }
    }
  }

  // 리뷰 입력 모달창
  async openReviewModal() {
    const modalContent = this.elements.modalTemplate.content.cloneNode(true);
    const modalOverlay = modalContent.querySelector('.modal__overlay');

    try {
      const productId = this.currentProductId();
      const product = await pb.collection('product').getOne(productId);

      this.updateModalProductInfo(modalOverlay, product);
      this.setupModalEventListeners(modalOverlay);

      this.shadowRoot.appendChild(modalOverlay);
      modalOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    } catch (error) {
      console.log(error);
    }
  }

  // 리뷰 입력창 상품 인포
  updateModalProductInfo(modalOverlay, product) {
    const productImage = modalOverlay.querySelector('.modal__product-image');
    const productName = modalOverlay.querySelector('.modal__product-name');

    if (product.product_image) {
      productImage.src = getImageUrl(product);
    }
    productImage.alt = `${product.product_name} 상품 이미지`;
    productName.textContent = product.product_name;
  }

  // 리뷰 입력창 이벤트 리스너
  setupModalEventListeners(modalOverlay) {
    const closeButton = modalOverlay.querySelector('.modal__close-btn');
    const cancelButton = modalOverlay.querySelector('.modal__button--cancel');
    closeButton.addEventListener('click', () => this.closeModal(modalOverlay));
    cancelButton.addEventListener('click', () => this.closeModal(modalOverlay));

    const contentTextarea = modalOverlay.querySelector('#modalContent');
    const placeholder = modalOverlay.querySelector('.modal__textarea-placeholder');
    this.setupTextareaPlaceholder(contentTextarea, placeholder);

    const charCountCurrent = modalOverlay.querySelector('.modal__char-count-current');
    contentTextarea.addEventListener('input', () =>
      this.updateCharCount(contentTextarea, charCountCurrent)
    );

    const submitButton = modalOverlay.querySelector('.modal__button--submit');
    contentTextarea.addEventListener('input', () =>
      this.checkInputs(contentTextarea, submitButton)
    );

    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (contentTextarea.value.trim() !== '') {
        this.addReview(contentTextarea.value);
        this.closeModal(modalOverlay);
      }
    });
  }

  closeModal(modalOverlay) {
    modalOverlay.style.display = 'none';
    modalOverlay.remove();
    document.body.style.overflow = 'auto';
  }

  // 리뷰 입력창 내부 안내 사항 (placeholder 역할의 div) 디스플레이 설정
  setupTextareaPlaceholder(contentTextarea, placeholder) {
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
  }

  // 리뷰 입력창 내용 입력 시 글자 수 카운트
  updateCharCount(textarea, charCountElement) {
    const currentLength = textarea.value.length;
    charCountElement.textContent = currentLength.toLocaleString();
  }

  // 폼 유효성
  checkInputs(textarea, submitButton) {
    if (textarea.value.trim() !== '') {
      submitButton.classList.add('active');
      submitButton.removeAttribute('disabled');
      submitButton.setAttribute('aria-disabled', 'false');
    } else {
      submitButton.classList.remove('active');
      submitButton.setAttribute('disabled', '');
      submitButton.setAttribute('aria-disabled', 'true');
    }
  }

  // 리뷰 생성
  createReviewElement(review) {
    const reviewArticle = document.createElement('article');
    reviewArticle.className = 'review-article__list';

    let bestIcon = '';
    if (review.recommendCount >= 10) {
      bestIcon = '<span class="review-item__badge">베스트</span>';
    }

    const userName = this.maskName(review.expand.user.name);
    const productName = review.expand.product.product_name;

    const date = new Date(review.created);
    const writtenDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

    reviewArticle.innerHTML = `
    <article class="review-article__list" aria-labelledby="고객 후기">
    <div class="review-article__list-area">
      <div class="review-item">
        <div class="review-item__user">
          <span class="review-item__badge">${bestIcon}</span>
          <span class="review-item__author">${userName}</span>
        </div>
      </div>
      <article class="review">
        <span class="review__product-name" aria-label="리뷰 대상 제품:">
          ${productName}
        </span>
        <p class="review__text">${review.review_content}</p>
        <div class="review__gallery">
        </div>
        <footer class="review__footer">
          <time class="review__date" datetime="2024-07-08">${writtenDate}</time>
          <button type="button" class="review__helpful-btn" aria-pressed="false" aria-label="이 리뷰가 도움이 되었습니다. 현재 10명이 도움이 되었다고 평가했습니다.">
            <span class="review__helpful-btn-icon" aria-hidden="true"></span>
            <span class="review__helpful-btn-text">도움돼요 ${review.recommendCount}</span>
          </button>
        </footer>
      </article>
    </div>
  </article>
    `;

    const helpfulButton = reviewArticle.querySelector('.review__helpful-btn');
    const helpfulConutNum = helpfulButton.querySelector('.review__helpful-btn-text');
    let helpfulCount = review.recommendCount;

    helpfulButton.addEventListener('click', () => {
      helpfulCount++;
      helpfulConutNum.textContent = `도움돼요 ${helpfulCount}`;
    });

    return reviewArticle;
  }

  // 리뷰 리스트 업데이트
  updateReviewList(reviewData) {
    if (this.elements.reviewList) {
      if (reviewData.items.length === 0) {
        this.elements.emptyReview.style.display = 'flex';
        this.elements.reviewList.innerHTML = '';
      } else {
        this.elements.emptyReview.style.display = 'none';
        this.elements.reviewList.innerHTML = '';
        reviewData.items.forEach((review) => {
          const reviewElement = this.createReviewElement(review);
          this.elements.reviewList.appendChild(reviewElement);
        });
      }

      this.updateReviewCount(reviewData.totalItems);
    }
  }

  // 추천순, 등록순 탭 활성화
  updateTabs(activeTab) {
    if (activeTab === 'recommended') {
      this.elements.recommendedTab.classList.add('review-content__sort-btn--active');
      this.elements.recentTab.classList.remove('review-content__sort-btn--active');
      this.sortOption = 'recommended';
    } else {
      this.elements.recentTab.classList.add('review-content__sort-btn--active');
      this.elements.recommendedTab.classList.remove('review-content__sort-btn--active');
      this.sortOption = 'recent';
    }
  }

  // 리뷰 써머리 총 개수
  updateReviewCount(count) {
    this.elements.reviewCountElement.textContent = count.toLocaleString();
  }

  // 개인정보 관련 이름 마스킹 작업
  maskName(name) {
    if (name.length === 1) {
      return name;
    } else if (name.length === 2) {
      return name.slice(0, 1) + '*';
    } else {
      return name.slice(0, 1) + '*'.repeat(name.length - 2) + name.slice(-1);
    }
  }

  // 리뷰 게시판 페이지 버튼 관련
  updatePaginationButton(totalItems) {
    const totalPage = Math.ceil(totalItems / this.perPage);

    if (this.currentPage <= 1) {
      this.elements.prevButton.disabled = true;
      this.elements.prevButton.setAttribute('aria-disabled', 'true');
    } else {
      this.elements.prevButton.disabled = false;
      this.elements.prevButton.setAttribute('aria-disabled', 'false');
    }

    if (this.currentPage >= totalPage) {
      this.elements.nextButton.disabled = true;
      this.elements.nextButton.setAttribute('aria-disabled', 'true');
    } else {
      this.elements.nextButton.disabled = false;
      this.elements.nextButton.setAttribute('aria-disabled', 'false');
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderReview(this.sortOption);
    }
  }

  nextPage() {
    this.currentPage++;
    this.renderReview(this.sortOption);
  }
}
