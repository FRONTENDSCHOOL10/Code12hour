import './header.scss';
import { cart } from '@/utils/cart';
import { defaultAuthData, pb } from '@/api/index';
import css from './header.scss?inline';

const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
  <style>${css}</style>
    <header class="karly-header">
      <div class="top-banner" role="banner">
        <nav class="top-banner__nav" aria-label="프로모션 배너">
          <a
            href="/src/pages/register/"
            class="top-banner__link"
            aria-label="
            지금 가입하고 인기상품 100원에 받아가세요! 회원 가입 페이지로 이동
          "
          >
            지금 가입하고 인기상품 <span>100원</span>에 받아가세요!
          </a>
          <button class="top-banner__close" aria-label="프로모션 배너 닫기">
            <img src="/assets/icons/header/Close.png" alt="" />
          </button>
        </nav>
      </div>
      <div class="header-top">
        <div class="auth-links">
        </div>
        <div class="search-area">
          <div class="logo-section">
            <a href="/" aria-label="마켓칼리 홈으로 이동">
              <img src="/assets/images/header/logo.svg" alt="마켓칼리" aria-hidden="true"/>
            </a>
            <a
              href="/"
              class="logo-link logo-link-is-active"
              aria-pressed="true"
              aria-label="마켓칼리 페이지로 이동"
              >마켓칼리</a
            >
            <div class="divider" aria-hidden="true"></div>
            <a href="/" class="logo-link" aria-pressed="false" aria-label="뷰티칼리 페이지로 이동"
              >뷰티칼리</a
            >
          </div>
          <div class="search-box">
            <label for="product_search" class="sr-only">상품 검색</label>
            <input type="text" id="product_search" placeholder="검색어를 입력해주세요" />
            <button type="button" aria-label="검색"></button>
          </div>
          <ul class="user-actions">
            <li>
              <button
                class="user-actions__location"
                type="button"
                aria-label="배송지 등록"
              ></button>
            </li>
            <div class="location-tooltip">

            </div>
            <li>
              <a
                href="#"
                class="user-actions__wishlist"
                role="button"
                aria-label="찜한 상품 목록 페이지로 이동"
              ></a>
            </li>
            <li>
              <a
                href="/src/pages/product-cart/"
                class="user-actions__cart" 
                role="button" 
                aria-label="장바구니 페이지로 이동"
              ></a>
            </li>
          </ul>
        </div>
      </div>
      <nav class="header-nav" aria-label="메인 네비게이션">
        <div class="category-menu">
          <span class="category-menu__icon" aria-hidden="true"></span>
          <button class="category-menu__text" aria-controls="menu-container">카테고리</button>
          <div class="menu-container">
            <div class="menu-box">
              <ul class="menu-list">
                <li class="menu-list__item">
                  <img src="/assets/icons/Menu/Gift.png" alt="선물하기" aria-hidden="true" />
                  <a href="#" aria-label="선물하기 카테고리로 이동">선물하기</a>
                </li>
                <li class="menu-list__item">
                  <img src="/assets/icons/Menu/Vegetable.png" alt="채소" aria-hidden="true" />
                  <a href="#" aria-label="채소 카테고리로 이동">채소</a>
                </li>
                <li class="menu-list__item">
                  <img src="/assets/icons/Menu/Fruit.png" alt="과일·견과·쌀" aria-hidden="true" />
                  <a href="#" aria-label="과일·견과·쌀 카테고리로 이동">과일·견과·쌀</a>
                </li>
                <li class="menu-list__item">
                  <img
                    src="/assets/icons/Menu/SeaFood.png"
                    alt="수산·해산·건어물"
                    aria-hidden="true"
                  />
                  <a href="#" aria-label="수산·해산·건어물 카테고리로 이동">수산·해산·건어물</a>
                </li>
                <li class="menu-list__item">
                  <img src="/assets/icons/Menu/Meet.png" alt="정육·계란" aria-hidden="true" />
                  <a href="#" aria-label="정육·계란 카테고리로 이동">정육·계란</a>
                </li>
                <li class="menu-list__item">
                  <img
                    src="/assets/icons/Menu/Cook.png"
                    alt="국·반찬·메인요리"
                    aria-hidden="true"
                  />
                  <a href="#" aria-label="국·반찬·메인요리 카테고리로 이동">국·반찬·메인요리</a>
                </li>
                <li class="menu-list__item">
                  <img src="/assets/icons/Menu/Salad.png" alt="샐러드·간편식" aria-hidden="true" />
                  <a href="#" aria-label="샐러드·간편식 카테고리로 이동">샐러드·간편식</a>
                </li>
                <li class="menu-list__item">
                  <img src="/assets/icons/Menu/Oil.png" alt="면·양념·오일" aria-hidden="true" />
                  <a href="#" aria-label="면·양념·오일 카테고리로 이동">면·양념·오일</a>
                </li>
                <li class="menu-list__item">
                  <img
                    src="/assets/icons/Menu/Coffee.png"
                    alt="생수·음료·우유·커피"
                    aria-hidden="true"
                  />
                  <a href="#" aria-label="생수·음료·우유·커피 카테고리로 이동"
                    >생수·음료·우유·커피</a
                  >
                </li>
                <li class="menu-list__item">
                  <img src="/assets/icons/Menu/Snack.png" alt="간식·과자·떡" aria-hidden="true" />
                  <a href="#" aria-label="간식·과자·떡 카테고리로 이동">간식·과자·떡</a>
                </li>
                <li class="menu-list__item">
                  <img
                    src="/assets/icons/Menu/Bread.png"
                    alt="베이커리·치즈·델리"
                    aria-hidden="true"
                  />
                  <a href="#" aria-label="베이커리·치즈·델리 카테고리로 이동">베이커리·치즈·델리</a>
                </li>
                <li class="menu-list__item">
                  <img src="/assets/icons/Menu/Health.png" alt="건강식품" aria-hidden="true" />
                  <a href="#" aria-label="건강식품 카테고리로 이동">건강식품</a>
                </li>
                <li class="menu-list__item">
                  <img src="/assets/icons/Menu/Wine.png" alt="와인" aria-hidden="true" />
                  <a href="#" aria-label="와인 카테고리로 이동">와인</a>
                </li>
                <li class="menu-list__item">
                  <img
                    src="/assets/icons/Menu/Traditional-Liquor.png"
                    alt="전통주"
                    aria-hidden="true"
                  />
                  <a href="#" aria-label="전통주 카테고리로 이동">전통주</a>
                </li>
                <li class="menu-list__item">
                  <img
                    src="/assets/icons/Menu/Detergent.png"
                    alt="생활용품·리빙·캠핑"
                    aria-hidden="true"
                  />
                  <a href="#" aria-label="생활용품·리빙·캠핑 카테고리로 이동">생활용품·리빙·캠핑</a>
                </li>
                <li class="menu-list__item">
                  <img
                    src="/assets/icons/Menu/Cosmetics.png"
                    alt="스킨케어·메이크업"
                    aria-hidden="true"
                  />
                  <a href="#" aria-label="스킨케어·메이크업 카테고리로 이동">스킨케어·메이크업</a>
                </li>
                <li class="menu-list__item">
                  <img
                    src="/assets/icons/Menu/Shampoo.png"
                    alt="헤어·바디·구강"
                    aria-hidden="true"
                  />
                  <a href="#" aria-label="헤어·바디·구강 카테고리로 이동">헤어·바디·구강</a>
                </li>
                <li class="menu-list__item">
                  <img src="/assets/icons/Menu/Food.png" alt="주방용품" aria-hidden="true" />
                  <a href="#" aria-label="주방용품 카테고리로 이동">주방용품</a>
                </li>
                <li class="menu-list__item">
                  <img
                    src="/assets/icons/Menu/HomeAppliances.png"
                    alt="가전제품"
                    aria-hidden="true"
                  />
                  <a href="#" aria-label="가전제품 카테고리로 이동">가전제품</a>
                </li>
                <li class="menu-list__item">
                  <img src="/assets/icons/Menu/Dog.png" alt="반려동물" aria-hidden="true" />
                  <a href="#" aria-label="반려동물 카테고리로 이동">반려동물</a>
                </li>
                <li class="menu-list__item">
                  <img
                    src="/assets/icons/Menu/Baby.png"
                    alt="베이비·키즈·완구"
                    aria-hidden="true"
                  />
                  <a href="#" aria-label="베이비·키즈·완구 카테고리로 이동">베이비·키즈·완구</a>
                </li>
                <li class="menu-list__item">
                  <img src="/assets/icons/Menu/Travel.png" alt="여행·티켓" aria-hidden="true" />
                  <a href="#" aria-label="여행·티켓 카테고리로 이동">여행·티켓</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul class="shopping-categories">
          <li class="category-item">
            <a href="#" aria-label="신상품 카테고리 페이지로 이동">신상품</a>
          </li>
          <li class="category-item">
            <a href="#" aria-label="베스트 카테고리 페이지로 이동">베스트</a>
          </li>
          <li class="category-item">
            <a href="#" aria-label="알뜰쇼핑 카테고리 페이지로 이동">알뜰쇼핑</a>
          </li>
          <li class="category-item">
            <a href="#" aria-label="특가,혜택 카테고리 페이지로 이동">특가/혜택</a>
          </li>
        </ul>
        <button class="notification" aria-label="배송 안내"><span>샛별·낮</span> 배송안내</button>
      </nav>
    </header>
    <c-modal width="400px" height="190px">
      <h2 slot="header" class="modal-header">배송지 등록</h2>
      <h3 slot="header" class="modal-sub-header">경상북도 영주시 구성로 142번길 20</h3>
      <span slot="header" class="modal-divider"></span>
      <input slot="body" class="modal__input" type="text" placeholder="등록할 주소를 입력 해주세요."/>
      <div slot="footer" class="modal-button-group">
        <button slot="footer" type="button" class="modal__close" id="close-btn" aria-label="배송지 등록 모달창 닫기">닫기</button>
        <button slot="footer" class="modal__address-change" type="button" aria-label="배송지 등록 하기">등록하기</button>
      </div>
    </c-modal>
`;
export class header extends HTMLElement {
  constructor() {
    super();
    // Shadow DOM을 사용하여 캡슐화된 스타일과 마크업 생성
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));

    this.initElements();
    this.usingKeyboard = false;
    this.currentFocusedItem = null;
    // Map을 사용하여 여러 요소의 타이머를 효율적으로 관리
    this.hideTimeouts = new Map();
    this.closeTime = localStorage.getItem('topBanner');
    this.DELAY = 250; // 모든 지연에 사용되는 공통 값
  }

  // 쿼리 셀렉터를 사용하여 필요한 DOM 요소 초기화
  initElements() {
    const selectors = {
      categoryMenu: '.category-menu',
      categoryMenuButton: '.category-menu__text',
      menuContainer: '.menu-container',
      menuLists: '.menu-list__item',
      menuItems: '.menu-list__item a',
      locationButton: '.user-actions__location',
      locationTooltip: '.location-tooltip',
      topBanner: '.top-banner',
      topBannerCloseButton: '.top-banner__close',
      modal: 'c-modal',
      cartIcon: '.user-actions__cart',
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

  // Web Component 생명주기 메서드: 컴포넌트가 DOM에 연결될 때 호출
  connectedCallback() {
    this.checkBanner();
    this.checkAuth();
    this.setupEventListeners();
    this.updateCartBadge();
  }

  // 이벤트 위임 및 이벤트 리스너를 사용하여 사용자 상호작용 처리
  setupEventListeners() {
    document.addEventListener('keydown', () => (this.usingKeyboard = true));
    document.addEventListener('mousedown', () => (this.usingKeyboard = false));

    this.shadowRoot.addEventListener('focusin', this.handleFocusIn.bind(this));
    this.shadowRoot.addEventListener('focusout', this.handleFocusOut.bind(this));

    this.addToggleEvents(
      this.elements.categoryMenu,
      () => this.showElement(this.elements.menuContainer),
      () => this.hideWithDelay(this.elements.menuContainer)
    );
    this.addToggleEvents(
      this.elements.locationButton,
      () => this.showElement(this.elements.locationTooltip),
      () => this.hideWithDelay(this.elements.locationTooltip)
    );
    this.addToggleEvents(
      this.elements.locationTooltip,
      () => this.clearHideTimeout(this.elements.locationTooltip),
      () => this.hideWithDelay(this.elements.locationTooltip)
    );

    this.elements.topBannerCloseButton.addEventListener('click', this.handleCloseBanner.bind(this));
    document.addEventListener('cartUpdated', this.updateCartBadge.bind(this));
  }

  // 재사용 가능한 이벤트 리스너 추가 함수
  addToggleEvents(element, showCallback, hideCallback) {
    element.addEventListener('mouseenter', showCallback);
    element.addEventListener('mouseleave', hideCallback);
  }

  // 포커스 이벤트 처리: 키보드 접근성 지원
  handleFocusIn({ target }) {
    if (!this.usingKeyboard) return;

    if (target === this.elements.categoryMenuButton) {
      this.elements.categoryMenu.classList.add('focused');
      this.showElement(this.elements.menuContainer);
    } else if (target.closest('.menu-list__item')) {
      this.handleMenuItemFocus(target);
    } else if (target === this.elements.locationButton || target.closest('.location-tooltip')) {
      this.showElement(this.elements.locationTooltip);
    }
  }

  // 포커스 아웃 이벤트 처리
  handleFocusOut({ target }) {
    if (target === this.elements.categoryMenuButton) {
      this.elements.categoryMenu.classList.remove('focused');
    } else if (target.closest('.menu-list__item')) {
      this.handleMenuItemBlur();
    } else if (target === this.elements.locationButton || target.closest('.location-tooltip')) {
      this.hideWithDelay(this.elements.locationTooltip);
    }
  }

  // 메뉴 아이템 포커스 처리: 시각적 피드백 제공
  handleMenuItemFocus(item) {
    if (this.currentFocusedItem) {
      this.currentFocusedItem.classList.remove('focused');
    }
    const menuList = item.closest('.menu-list__item');
    if (menuList) {
      menuList.classList.add('focused');
      this.currentFocusedItem = menuList;
    }
  }

  // 메뉴 아이템 블러 처리
  handleMenuItemBlur() {
    setTimeout(() => {
      if (!this.shadowRoot.activeElement?.closest('.menu-list__item')) {
        this.hideElement(this.elements.menuContainer);
        if (this.currentFocusedItem) {
          this.currentFocusedItem.classList.remove('focused');
          this.currentFocusedItem = null;
        }
      }
    }, 0);
  }

  // 배너 닫기 처리: localStorage를 사용한 상태 저장
  handleCloseBanner() {
    this.hideElement(this.elements.topBanner);
    const closeTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem('topBanner', closeTime);
  }

  // 배너 표시 여부 확인: 저장된 시간과 현재 시간 비교
  checkBanner() {
    if (!this.closeTime) return;

    const currentTime = Date.now();
    if (currentTime < this.closeTime) {
      this.hideElement(this.elements.topBanner);
    } else {
      localStorage.removeItem('topBanner');
    }
  }

  // 장바구니 뱃지 업데이트 메서드
  updateCartBadge(event) {
    const cartItemCount = event ? event.detail : cart.length;
    if (cartItemCount > 0) {
      this.elements.cartIcon.innerHTML = `
        <span class="user-actions__badge">${cartItemCount}</span>
      `;
    }
  }

  // 로그인 여부에 따른 조건부 렌더링
  checkAuth() {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const { isAuth, user } = auth;
    const authLink = this.shadowRoot.querySelector('.auth-links');
    const locationTooltip = this.shadowRoot.querySelector('.location-tooltip');

    const getAuthButton = () => {
      if (isAuth) {
        return `
        <button
          type="button"
          class="auth-links__logout"
          aria-label="로그아웃 버튼"
        >로그아웃
        </button>
      `;
      }
      return `<a href="/src/pages/login/" class="auth-links__login">로그인</a>`;
    };

    const getUserInfo = () => {
      if (isAuth) {
        return `<span class="auth-links__username">${user.name}</span>`;
      }
      return `<a href="/src/pages/register/" class="auth-links__signup">회원가입</a>`;
    };

    const getLocationTooltipContent = () => {
      if (isAuth) {
        return `
          <p class="modal-notice">배송지 변경</p>
          <div class="modal-divider"></div>
          <span class="modal-location-register__title"><span>${user.name}</span>님의 등록된 주소</span>
          <p class="modal-location__address">${user.address}</p>
          <span class="modal-location-delivery">${user.morning_delivery ? '샛별배송' : '일반배송'}</span>
          <div class="location-tooltip-button">
            <button
              type="button"
              class="location-tooltip-button__location"
              aria-label="주소 변경 모달 버튼"
            >
              주소 변경
            </button>
          </div>
        `;
      } else {
        return `
          <p class="modal-notice2"><strong>배송지를 등록</strong>하고<br />구매 가능한 상품을 확인하세요!</p>
          <div class="location-tooltip-button">
            <a
              href="/src/pages/login/"
              role="button"
              class="location-tooltip-button__login"
              aria-label="로그인 페이지로 이동"
            >로그인</a>
          </div>
        `;
      }
    };

    const authLinksHtml = `
      ${getUserInfo()}
      <div class="divider" aria-hidden="true"></div>
      ${getAuthButton()}
      <div class="divider" aria-hidden="true"></div>
      <div class="customer-service">
        <a href="#">고객센터</a>
      </div>
    `;

    authLink.innerHTML = authLinksHtml;
    locationTooltip.innerHTML = getLocationTooltipContent();

    if (isAuth) {
      const logOutButton = this.shadowRoot.querySelector('.auth-links__logout');
      logOutButton?.addEventListener('click', this.handleLogout.bind(this));
    }

    const locationButton = this.shadowRoot.querySelector('.location-tooltip-button__location');
    locationButton?.addEventListener('click', this.handleLocationRegistration.bind(this, user));
  }

  // 로그아웃 기능 메서드
  handleLogout() {
    const modalContent = {
      title: '로그아웃',
      body: '로그아웃 하시겠습니까?',
      closeText: '취소',
      logoutText: '확인',
    };

    const createModalHTML = ({ title, body, closeText, logoutText }) => `
    <h2 slot="header" class="logout-modal__title">${title}</h2>
    <p slot="header" class="logout-modal__body">${body}</p>
    <div slot="footer" class="logout-modal-button">
      <button slot="footer" type="button" id="modal__close" class="logout-modal__close">${closeText}</button>
      <button slot="footer" type="button" id="modal__logout" class="logout-modal__logout">${logoutText}</button>
    </div>
  `;

    const setupModal = () => {
      this.elements.modal.setAttribute('width', '350px');
      this.elements.modal.setAttribute('height', '180px');
      this.elements.modal.innerHTML = createModalHTML(modalContent);
      this.elements.modal.showModal();
    };

    const initEventListeners = () => {
      const logout = this.shadowRoot.querySelector('.logout-modal__logout');
      const close = this.shadowRoot.querySelector('.logout-modal__close');

      const handleLogoutClick = () => {
        pb.authStore.clear();
        localStorage.setItem('auth', JSON.stringify(defaultAuthData));
        location.reload();
      };

      const handleCloseClick = () => {
        this.elements.modal.close();
      };

      logout.addEventListener('click', handleLogoutClick);
      close.addEventListener('click', handleCloseClick);

      // 모달이 닫힐 때 이벤트 리스너 제거
      this.elements.modal.addEventListener(
        'close',
        () => {
          logout.removeEventListener('click', handleLogoutClick);
          close.removeEventListener('click', handleCloseClick);
        },
        { once: true }
      );
    };

    setupModal();
    initEventListeners();
  }

  // 주소 등록 메서드
  handleLocationRegistration(user) {
    const modalContent = {
      title: '배송지 변경',
      subTitle: user.address,
      placeholder: '변경할 주소를 입력 해주세요.',
      closeText: '닫기',
      registerText: '변경하기',
    };

    const createModalHTML = ({ title, subTitle, placeholder, closeText, registerText }) => `
    <h2 slot="header" class="modal-header">${title}</h2>
    <h3 slot="header" class="modal-sub-header">${subTitle}</h3>
    <span slot="header" class="modal-divider"></span>
    <input slot="body" class="modal__input" type="text" placeholder="${placeholder}"/>
    <div slot="footer" class="modal-button-group">
      <button slot="footer" type="button" class="modal__close" id="close-btn" aria-label="배송지 변경 모달창 닫기">${closeText}</button>
      <button slot="footer" class="modal__address-change" type="button" aria-label="배송지 변경 하기">${registerText}</button>
    </div>
  `;

    const setupModal = () => {
      this.elements.modal.setAttribute('width', '400px');
      this.elements.modal.setAttribute('height', '190px');
      this.elements.modal.innerHTML = createModalHTML(modalContent);
      this.elements.modal.showModal();
    };

    const initEventListeners = () => {
      const registerButton = this.shadowRoot.querySelector('.modal__address-change');
      const closeButton = this.shadowRoot.querySelector('.modal__close');
      const inputField = this.shadowRoot.querySelector('.modal__input');

      const handleRegisterClick = () => {
        const newAddress = inputField.value;
        console.log('새로운 주소:', newAddress);
        this.elements.modal.close();
      };

      const handleCloseClick = () => {
        this.elements.modal.close();
      };

      registerButton.addEventListener('click', handleRegisterClick);
      closeButton.addEventListener('click', handleCloseClick);

      // 모달이 닫힐 때 이벤트 리스너 제거
      this.elements.modal.addEventListener(
        'close',
        () => {
          registerButton.removeEventListener('click', handleRegisterClick);
          closeButton.removeEventListener('click', handleCloseClick);
        },
        { once: true }
      );
    };

    setupModal();
    initEventListeners();
  }

  // 유틸리티 함수: 요소 표시
  showElement(element) {
    this.clearHideTimeout(element);
    element.style.display = 'block';
  }

  // 유틸리티 함수: 요소 숨기기
  hideElement(element) {
    element.style.display = 'none';
  }

  // 유틸리티 함수: 지연 후 요소 숨기기
  hideWithDelay(element) {
    this.clearHideTimeout(element);
    const timeout = setTimeout(() => this.hideElement(element), this.DELAY);
    this.hideTimeouts.set(element, timeout);
  }

  // 유틸리티 함수: 숨김 타이머 제거
  clearHideTimeout(element) {
    const timeout = this.hideTimeouts.get(element);
    if (timeout) {
      clearTimeout(timeout);
      this.hideTimeouts.delete(element);
    }
  }
}
