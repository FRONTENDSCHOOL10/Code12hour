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
`;

export class CartButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(cartButtonTemplate.content.cloneNode(true));

    this.showButton = this.shadowRoot.querySelector('.product-item__button');
    this.penalDialog = this.shadowRoot.querySelector('.cart-dialog');
    this.closeButton = this.shadowRoot.querySelector('.cart-dialog__form-button--cancel');
  }

  connectedCallback() {
    this.showModal();
    this.closeModal();
  }

  showModal() {
    this.showButton.addEventListener('click', () => {
      this.penalDialog.showModal();
    });
  }

  closeModal() {
    this.closeButton.addEventListener('click', () => {
      this.penalDialog.close();
    });
  }
}
