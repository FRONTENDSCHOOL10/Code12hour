import './header-small.scss';
import { cart } from '@/utils/cart';
import css from './header-small.scss?inline';

const headerSmallTemplate = document.createElement('template');
headerSmallTemplate.innerHTML = `
    <style>${css}</style>
    <header class="karly-header">
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
        </ul>
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

export class headerSmall extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(headerSmallTemplate.content.cloneNode(true));
    this.header = this.shadowRoot.querySelector('.karly-header');

    this.initElements();
    this.usingKeyboard = false;
    this.currentFocusedItem = null;
    this.hideTimeouts = new Map();
    this.DELAY = 250;
  }

  initElements() {
    this.elements = {
      categoryMenu: this.shadowRoot.querySelector('.category-menu'),
      categoryMenuButton: this.shadowRoot.querySelector('.category-menu__text'),
      menuContainer: this.shadowRoot.querySelector('.menu-container'),
      menuLists: this.shadowRoot.querySelectorAll('.menu-list__item'),
      menuItems: this.shadowRoot.querySelectorAll('.menu-list__item a'),
      locationButton: this.shadowRoot.querySelector('.user-actions__location'),
      locationTooltip: this.shadowRoot.querySelector('.location-tooltip'),
      modal: this.shadowRoot.querySelector('c-modal'),
      cartIcon: this.shadowRoot.querySelector('.user-actions__cart'),
    };
  }

  connectedCallback() {
    this.checkAuth();
    this.setupEventListeners();
    this.setupScrollListener();
    this.updateHeaderVisibility();
    this.updateCartBadge();
  }

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

    document.addEventListener('cartUpdated', this.updateCartBadge.bind(this));
  }

  setupScrollListener() {
    window.addEventListener('scroll', () => {
      this.updateHeaderVisibility();
    });
  }

  updateHeaderVisibility() {
    if (window.scrollY > 242) {
      this.header.classList.add('visible');
    } else {
      this.header.classList.remove('visible');
    }
  }

  addToggleEvents(element, showCallback, hideCallback) {
    if (element) {
      element.addEventListener('mouseenter', showCallback);
      element.addEventListener('mouseleave', hideCallback);
    }
  }

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

  handleFocusOut({ target }) {
    if (target === this.elements.categoryMenuButton) {
      this.elements.categoryMenu.classList.remove('focused');
    } else if (target.closest('.menu-list__item')) {
      this.handleMenuItemBlur();
    } else if (target === this.elements.locationButton || target.closest('.location-tooltip')) {
      this.hideWithDelay(this.elements.locationTooltip);
    }
  }

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

  // 장바구니 뱃지 업데이트 메서드
  updateCartBadge(event) {
    const cartItemCount = event ? event.detail : cart.length;
    if (cartItemCount > 0) {
      this.elements.cartIcon.innerHTML = `
      <span class="user-actions__badge">${cartItemCount}</span>
    `;
    }
  }

  checkAuth() {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const { isAuth, user } = auth;
    const locationTooltip = this.shadowRoot.querySelector('.location-tooltip');

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

    locationTooltip.innerHTML = getLocationTooltipContent();

    const locationButton = this.shadowRoot.querySelector('.location-tooltip-button__location');
    locationButton?.addEventListener('click', this.handleLocationRegistration.bind(this, user));
  }

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

  showElement(element) {
    if (element) {
      this.clearHideTimeout(element);
      element.style.display = 'block';
    }
  }

  hideElement(element) {
    if (element) {
      element.style.display = 'none';
    }
  }

  hideWithDelay(element) {
    if (element) {
      this.clearHideTimeout(element);
      const timeout = setTimeout(() => this.hideElement(element), this.DELAY);
      this.hideTimeouts.set(element, timeout);
    }
  }

  clearHideTimeout(element) {
    const timeout = this.hideTimeouts.get(element);
    if (timeout) {
      clearTimeout(timeout);
      this.hideTimeouts.delete(element);
    }
  }
}
