import './cart-button.scss';
import css from './cart-button.scss?inline'; // css 파일 inline 가져오기 이렇게 하지 않으면 동적으로 css를 못넣음 빌드하면 파일 위치, 명이 다 바뀌기 때문

const cartButtonTemplate = document.createElement('template');
cartButtonTemplate.innerHTML = `
  <style>${css}</style>
  <dialog class="cart-dialog" aria-labelledby="item-title">
      <div class="cart-dialog-wrapper">
        <p class="cart-dialog__title" id="item-title">[하코야] 살얼음 동동 냉메밀 소바</p>
        <div class="cart-dialog__content-group">
          <div class="cart-dialog__price-group">
            <span class="cart-dialog__price--sale"><span class="sr-only">할인가</span>4,980원</span>
            <span class="cart-dialog__price--original"
              ><span class="sr-only">정가</span>5,000원</span
            >
          </div>
          <div class="cart-dialog__quantity-group">
            <button class="cart-dialog__button--decrease" type="button">-</button>
            <span class="cart-dialog__quantity-value"><span class="sr-only">개수</span>1</span>
            <button class="cart-dialog__button--increase" type="button">+</button>
          </div>
        </div>
        <div class="cart-dialog__total-group">
          <span>합계</span>
          <span class="cart-dialog__total">4,950원</span>
        </div>
        <form class="cart-dialog__form-group" method="dialog">
          <button class="cart-dialog__form-button--cancel" type="button">취소</button>
          <button class="cart-dialog__form-button--submit" type="button">장바구니 담기</button>
        </form>
      </div>
    </dialog>
    <button class="product-item__button" type="button">담기</button>
    <c-modal width="250px" height="420px">
      <h2 slot="header" class="modal-header">장바구니 담기 완료</h2>
      <div slot="body" class="modal-body">

      </div>
      <button slot="footer" type="button" id="modal__close" class="modal__close">닫기</button>
    </c-modal>
`;

export class CartButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(cartButtonTemplate.content.cloneNode(true));

    this.quantity = 1;
    this.price = 0;
    this.initElements();
  }

  // 요소들을 객체 형태로 만들어 한번에 초기화
  initElements() {
    const selectors = {
      showButton: '.product-item__button',
      penalDialog: '.cart-dialog',
      closeButton: '.cart-dialog__form-button--cancel',
      submitButton: '.cart-dialog__form-button--submit',
      quantityElement: '.cart-dialog__quantity-value',
      decreaseButton: '.cart-dialog__button--decrease',
      increaseButton: '.cart-dialog__button--increase',
      totalElement: '.cart-dialog__total',
      titleElement: '.cart-dialog__title',
      salePriceElement: '.cart-dialog__price--sale',
      originalPriceElement: '.cart-dialog__price--original',
      modal: 'c-modal',
      modalCloseButton: '.modal__close',
      modalBody: '.modal-body',
    };

    this.elements = Object.fromEntries(
      Object.entries(selectors).map(([key, selector]) => [
        key,
        this.shadowRoot.querySelector(selector),
      ])
    );
  }

  connectedCallback() {
    this.setupEventListeners();
    this.updateProductInfo();
  }

  // 각 요소에 대한 클릭 이벤트 리스너들을 객체로 묶어서 한번에 정의
  setupEventListeners() {
    const listeners = {
      showButton: () => this.open(),
      submitButton: () => this.addToCart(),
      closeButton: () => this.close(),
      decreaseButton: () => this.changeQuantity(-1),
      increaseButton: () => this.changeQuantity(1),
      modalCloseButton: () => this.modalClose(),
    };

    Object.entries(listeners).forEach(([key, listener]) => {
      this.elements[key].addEventListener('click', listener);
    });
  }

  // 장바구니 모달을 여는 함수
  open() {
    this.elements.penalDialog.showModal();
    this.toggleBackgroundScroll(true);
  }

  // 장바구니 모달을 닫는 함수
  close() {
    this.elements.penalDialog.close();
    this.toggleBackgroundScroll(false);
  }

  // 장바구니 담기후 완료 문구의 모달을 여는 함수
  modalOpen() {
    const { modal, modalBody } = this.elements;
    const productName = this.getAttribute('data-product-name');
    const productImage = this.getAttribute('data-product-image');

    modal.showModal();
    modalBody.innerHTML = `
      <h3 slot="header" class="modal-sub-header">${productName}<span slot="body"> ${this.quantity}개</span></h3>
      <span slot="body" class="modal-divider"></span>
      <img slot="body" class="modal-image" src="${productImage}" alt="${productName}"/>
    `;
    this.toggleBackgroundScroll(true);

    // 1.2초 뒤 모달이 자동으로 닫힘
    setTimeout(() => this.modalClose(), 1200);
  }

  // 장바구니 담기후 완료 문구의 모달을 닫는 함수
  modalClose() {
    this.elements.modal.close();
    this.toggleBackgroundScroll(false);
  }

  // 수량을 변경하고 화면에 업데이트
  changeQuantity(change) {
    this.quantity = Math.max(1, this.quantity + change);
    this.updateDisplay();
  }

  // 장바구니에 제품을 추가, 로컬스토리지에 저장
  addToCart() {
    const productId = this.getAttribute('data-product-id');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += this.quantity;
    } else {
      cartItems.push({ productId, quantity: this.quantity });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.close();
    this.modalOpen();
  }

  // 수량과 총 금액을 화면에 업데이트 하는 부분
  updateDisplay() {
    const { quantityElement, totalElement } = this.elements;
    quantityElement.innerHTML = `<span class="sr-only">개수</span>${this.quantity}`;
    totalElement.textContent = `${(this.quantity * this.price).toLocaleString()}원`;
  }

  // 제품 정보를 업데이트
  updateProductInfo() {
    const { titleElement, salePriceElement, originalPriceElement } = this.elements;
    const productName = this.getAttribute('data-product-name');
    const productPrice = parseInt(this.getAttribute('data-product-price'), 10);
    const discountedPrice = parseInt(this.getAttribute('data-discounted-price'), 10);

    this.price = discountedPrice;
    titleElement.textContent = productName;
    salePriceElement.innerHTML = `<span class="sr-only">할인가</span>${discountedPrice.toLocaleString()}원`;
    originalPriceElement.innerHTML = `<span class="sr-only">정가</span>${productPrice.toLocaleString()}원`;
    this.updateDisplay();
  }

  // 모달 열려있는 상태일시 배경 스크롤 hidden
  toggleBackgroundScroll(prevent) {
    document.body.style.overflow = prevent ? 'hidden' : '';
  }
}