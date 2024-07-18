import './side-filter-panel.scss';
import css from './side-filter-panel.scss?inline';

const sideFilterPanelTemplate = document.createElement('template');
sideFilterPanelTemplate.innerHTML = `
  <style>${css}</style>
  <nav class="filter-panel">
      <div class="filter-panel__header">
        <p>필터</p>
        <button class="filter-panel__reset">초기화</button>
      </div>
      <details class="filter-panel__category-list" id="category">
        <summary class="filter-panel__category-title">
          카테고리
          <p class="header-count" aria-hidden="true">0</p>
          <img src="/assets/icons/arrow/category.svg" alt="펼치기" />
        </summary>
        <div class="filter-panel__category-box">
          <input
            class="filter-panel__category-input"
            type="checkbox"
            id="category-1"
            name="category"
          /><label class="filter-panel__category-name" for="category-1"
            >국 · 반찬 · 메인요리
            <p class="category-count">22</p></label
          >
        </div>
        <div class="filter-panel__category-box">
          <input
            class="filter-panel__category-input"
            type="checkbox"
            id="category-2"
            name="category"
          /><label class="filter-panel__category-name" for="category-2"
            >국 · 반찬 · 메인요리
            <p class="category-count">22</p></label
          >
        </div>
      </details>
      <details class="filter-panel__category-list" id="brand">
        <summary class="filter-panel__category-title">
          브랜드
          <p class="header-count" aria-hidden="true">0</p>
          <img src="/assets/icons/arrow/category.svg" alt="펼치기" />
        </summary>
        <div class="filter-panel__category-box">
          <input
            class="filter-panel__category-input"
            type="checkbox"
            id="brand-1"
            name="brand"
          /><label class="filter-panel__category-name" for="brand-1"
            >슬비쌤
            <p class="category-count">22</p></label
          >
        </div>
      </details>
      <details class="filter-panel__category-list" id="delivery">
        <summary class="filter-panel__category-title">
          배송
          <p class="header-count" aria-hidden="true">0</p>
          <img src="/assets/icons/arrow/category.svg" alt="펼치기" />
        </summary>
        <div class="filter-panel__category-box">
          <input
            class="filter-panel__category-input"
            type="checkbox"
            id="delivery-1"
            name="delivery"
          /><label class="filter-panel__category-name" for="delivery-1"
            >샛별배송
            <p class="category-count">22</p></label
          >
        </div>
      </details>
      <details class="filter-panel__category-list" id="price">
        <summary class="filter-panel__category-title">
          가격
          <p class="header-count" aria-hidden="true">0</p>
          <img src="/assets/icons/arrow/category.svg" alt="펼치기" />
        </summary>
        <div class="filter-panel__category-box">
          <input
            class="filter-panel__category-radio"
            name="price"
            type="radio"
            id="price-1"
          /><label class="filter-panel__category-name" for="price-1"
            >10,000원 미만
            <p class="category-count">22</p></label
          >
        </div>
        <div class="filter-panel__category-box">
          <input
            class="filter-panel__category-radio"
            name="price"
            type="radio"
            id="price-2"
          /><label class="filter-panel__category-name" for="price-2"
            >10,000원 이상
            <p class="category-count">22</p></label
          >
      </details>
      <details class="filter-panel__category-list" id="benefits">
        <summary class="filter-panel__category-title">
          혜택
          <p class="header-count" aria-hidden="true">0</p>
          <img src="/assets/icons/arrow/category.svg" alt="펼치기" />
        </summary>
        <div class="filter-panel__category-box">
          <input
            class="filter-panel__category-input"
            type="checkbox"
            id="benefits-2"
            name="benefits"
          /><label class="filter-panel__category-name" for="benefits-2"
            >한정수량
            <p class="category-count">22</p></label
          >
        </div>
      </details>
      <details class="filter-panel__category-list" id="type">
        <summary class="filter-panel__category-title">
          유형
          <p class="header-count" aria-hidden="true">0</p>
          <img src="/assets/icons/arrow/category.svg" alt="펼치기" />
        </summary>
        <div class="filter-panel__category-box">
          <input
            class="filter-panel__category-input"
            type="checkbox"
            id="type-1"
            name="type"
          /><label class="filter-panel__category-name" for="type-1"
            >Karly Only
            <p class="category-count">22</p></label
          >
        </div>
      </details>
    </nav>
`;

export class SideFilter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(sideFilterPanelTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.initialize();
  }

  // 체크 시 카운트(숫자) up
  updateCount(details) {
    const countSpan = details.querySelector('.header-count');
    const checkboxes = details.querySelectorAll(
      '.filter-panel__category-input:checked, .filter-panel__category-radio:checked'
    );
    countSpan.textContent = checkboxes.length;
  }

  updateCountEvent() {
    const inputs = this.shadowRoot.querySelectorAll(
      '.filter-panel__category-input, .filter-panel__category-radio'
    );
    inputs.forEach((input) => {
      input.addEventListener('change', () => {
        const parentDetails = input.closest('.filter-panel__category-list');
        this.updateCount(parentDetails);
      });
    });
  }

  // 초기화 버튼
  reset() {
    const resetButton = this.shadowRoot.querySelector('.filter-panel__reset');
    resetButton.addEventListener('click', () => {
      const allInputs = this.shadowRoot.querySelectorAll(
        '.filter-panel__category-input, .filter-panel__category-radio'
      );
      allInputs.forEach((input) => (input.checked = false));
      const allCounts = this.shadowRoot.querySelectorAll('.header-count');
      allCounts.forEach((countSpan) => (countSpan.textContent = '0'));
    });
  }

  initialize() {
    this.updateCountEvent();
    this.reset();
  }
}

/* import './side-filter-panel.scss';
import css from './side-filter-panel.scss?inline';

const sideFilterPanelTemplate = document.createElement('template');
sideFilterPanelTemplate.innerHTML = `
  <style>${css}</style>
  <nav class="filter-panel">
      <div class="filter-panel__header">
        <p>필터</p>
        <button class="filter-panel__reset">초기화</button>
      </div>
      <details class="filter-panel__category-list" id="category">
        <summary class="filter-panel__category-title">
          카테고리
          <p class="header-count" aria-hidden="true">0</p>
          <img src="/assets/icons/arrow/category.svg" alt="펼치기" />
        </summary>
        <div class="filter-panel__category-box">
          <input
            class="filter-panel__category-input"
            type="checkbox"
            id="category-1"
            name="category"
          /><label class="filter-panel__category-name" for="category-1"
            >국 · 반찬 · 메인요리
            <p class="category-count">22</p></label
          >
        </div>
        <div class="filter-panel__category-box">
          <input
            class="filter-panel__category-input"
            type="checkbox"
            id="category-2"
            name="category"
          /><label class="filter-panel__category-name" for="category-2"
            >국 · 반찬 · 메인요리
            <p class="category-count">22</p></label
          >
        </div>
      </details>
      <details class="filter-panel__category-list" id="brand">
        <summary class="filter-panel__category-title">
          브랜드
          <p class="header-count" aria-hidden="true">0</p>
          <img src="/assets/icons/arrow/category.svg" alt="펼치기" />
        </summary>
        <div class="filter-panel__category-box">
          <input
            class="filter-panel__category-input"
            type="checkbox"
            id="brand-1"
            name="brand"
          /><label class="filter-panel__category-name" for="brand-1"
            >슬비쌤
            <p class="category-count">22</p></label
          >
        </div>
      </details>
      <details class="filter-panel__category-list" id="delivery">
        <summary class="filter-panel__category-title">
          배송
          <p class="header-count" aria-hidden="true">0</p>
          <img src="/assets/icons/arrow/category.svg" alt="펼치기" />
        </summary>
        <div class="filter-panel__category-box">
          <input
            class="filter-panel__category-input"
            type="checkbox"
            id="delivery-1"
            name="delivery"
          /><label class="filter-panel__category-name" for="delivery-1"
            >샛별배송
            <p class="category-count">22</p></label
          >
        </div>
      </details>
      <details class="filter-panel__category-list" id="price">
        <summary class="filter-panel__category-title">
          가격
          <p class="header-count" aria-hidden="true">0</p>
          <img src="/assets/icons/arrow/category.svg" alt="펼치기" />
        </summary>
        <div class="filter-panel__category-box">
          <input
            class="filter-panel__category-radio"
            name="price"
            type="radio"
            id="price-1"
          /><label class="filter-panel__category-name" for="price-1"
            >10,000원 미만
            <p class="category-count">22</p></label
          >
        </div>
        <div class="filter-panel__category-box">
          <input
            class="filter-panel__category-radio"
            name="price"
            type="radio"
            id="price-2"
          /><label class="filter-panel__category-name" for="price-2"
            >10,000원 이상
            <p class="category-count">22</p></label
          >
      </details>
      <details class="filter-panel__category-list" id="benefits">
        <summary class="filter-panel__category-title">
          혜택
          <p class="header-count" aria-hidden="true">0</p>
          <img src="/assets/icons/arrow/category.svg" alt="펼치기" />
        </summary>
        <div class="filter-panel__category-box">
          <input
            class="filter-panel__category-input"
            type="checkbox"
            id="benefits-2"
            name="benefits"
          /><label class="filter-panel__category-name" for="benefits-2"
            >한정수량
            <p class="category-count">22</p></label
          >
        </div>
      </details>
      <details class="filter-panel__category-list" id="type">
        <summary class="filter-panel__category-title">
          유형
          <p class="header-count" aria-hidden="true">0</p>
          <img src="/assets/icons/arrow/category.svg" alt="펼치기" />
        </summary>
        <div class="filter-panel__category-box">
          <input
            class="filter-panel__category-input"
            type="checkbox"
            id="type-1"
            name="type"
          /><label class="filter-panel__category-name" for="type-1"
            >Karly Only
            <p class="category-count">22</p></label
          >
        </div>
      </details>
    </nav>
`;

export class SideFilter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(sideFilterPanelTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.initialize();
  }

  // 체크 시 카운트(숫자) up
  updateCount(details) {
    const countSpan = details.querySelector('.header-count');
    const checkboxes = details.querySelectorAll(
      '.filter-panel__category-input:checked, .filter-panel__category-radio:checked'
    );
    countSpan.textContent = checkboxes.length;
  }

  updateCountEvent() {
    const inputs = this.shadowRoot.querySelectorAll(
      '.filter-panel__category-input, .filter-panel__category-radio'
    );
    inputs.forEach((input) => {
      input.addEventListener('change', () => {
        const parentDetails = input.closest('.filter-panel__category-list');
        this.updateCount(parentDetails);
      });
    });
  }

  // 초기화 버튼
  reset() {
    const resetButton = this.shadowRoot.querySelector('.filter-panel__reset');
    resetButton.addEventListener('click', () => {
      const allInputs = this.shadowRoot.querySelectorAll(
        '.filter-panel__category-input, .filter-panel__category-radio'
      );
      allInputs.forEach((input) => (input.checked = false));
      const allCounts = this.shadowRoot.querySelectorAll('.header-count');
      allCounts.forEach((countSpan) => (countSpan.textContent = '0'));
    });
  }

  initialize() {
    this.updateCountEvent();
    this.reset();
  }
} */
