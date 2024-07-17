import './side-filter-panel.scss';
import css from './side-filter-panel.scss?inline';
import { pb } from '@/api/index';

export class SideFilter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.products = [];
  }

  async connectedCallback() {
    await this.getDatas();
    this.render();
    this.initialize();
  }

  async getDatas() {
    try {
      this.products = await pb.collection('product').getFullList({
        expand: 'brand,category'
      });
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  }

  render() {
    this.shadowRoot.innerHTML = this.generateTemplate();
  }

  generateTemplate() {
    return `
      <style>${css}</style>
      <nav class="filter-panel">
        <div class="filter-panel__header">
          <p>필터</p>
          <button class="filter-panel__reset">초기화</button>
        </div>
        ${this.createCategorySection()}
        ${this.createBrandSection()}
        ${this.createDeliverySection()}
        ${this.createPriceSection()}
        ${this.createBenefitsSection()}
        ${this.createTypeSection()}
      </nav>
    `;
  }

  createCategorySection() {
    const categories = [...new Set(this.products.map(p => p.expand.category.category_name))];
    return `
      <details class="filter-panel__category-list" id="category">
        <summary class="filter-panel__category-title">
          카테고리
          <p class="header-count" aria-hidden="true">0</p>
          <img src="/assets/icons/arrow/category.svg" alt="펼치기" />
        </summary>
        ${categories.map((category, index) => `
          <div class="filter-panel__category-box">
            <input
              class="filter-panel__category-input"
              type="checkbox"
              id="category-${index + 1}"
              name="category"
              value="${category}"
            />
            <label class="filter-panel__category-name" for="category-${index + 1}">
              ${category}
              <p class="category-count">${this.products.filter(p => p.expand.category.category_name === category).length}</p>
            </label>
          </div>
        `).join('')}
      </details>
    `;
  }

  createBrandSection() {
    const brands = [...new Set(this.products.map(p => p.expand.brand.brand_name))];
    return `
      <details class="filter-panel__category-list" id="brand">
        <summary class="filter-panel__category-title">
          브랜드
          <p class="header-count" aria-hidden="true">0</p>
          <img src="/assets/icons/arrow/category.svg" alt="펼치기" />
        </summary>
        ${brands.map((brand, index) => `
          <div class="filter-panel__category-box">
            <input
              class="filter-panel__category-input"
              type="checkbox"
              id="brand-${index + 1}"
              name="brand"
              value="${brand}"
            />
            <label class="filter-panel__category-name" for="brand-${index + 1}">
              ${brand}
              <p class="category-count">${this.products.filter(p => p.expand.brand.brand_name === brand).length}</p>
            </label>
          </div>
        `).join('')}
      </details>
    `;
  }

  createDeliverySection() {
    return `
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
            value="샛별배송"
          />
          <label class="filter-panel__category-name" for="delivery-1">
            샛별배송
            <p class="category-count">${this.products.length}</p>
          </label>
        </div>
      </details>
    `;
  }

  createPriceSection() {
    const priceRanges = [
      { id: 'price-1', label: '10,000원 미만', condition: p => p.product_price < 10000 },
      { id: 'price-2', label: '10,000원 이상', condition: p => p.product_price >= 10000 },
    ];

    return `
      <details class="filter-panel__category-list" id="price">
        <summary class="filter-panel__category-title">
          가격
          <p class="header-count" aria-hidden="true">0</p>
          <img src="/assets/icons/arrow/category.svg" alt="펼치기" />
        </summary>
        ${priceRanges.map(range => `
          <div class="filter-panel__category-box">
            <input
              class="filter-panel__category-radio"
              name="price"
              type="radio"
              id="${range.id}"
              value="${range.label}"
            />
            <label class="filter-panel__category-name" for="${range.id}">
              ${range.label}
              <p class="category-count">${this.products.filter(range.condition).length}</p>
            </label>
          </div>
        `).join('')}
      </details>
    `;
  }

  createBenefitsSection() {
    return `
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
            value="한정수량"
          />
          <label class="filter-panel__category-name" for="benefits-2">
            한정수량
            <p class="category-count">${this.products.filter(p => p.event_product).length}</p>
          </label>
        </div>
      </details>
    `;
  }

  createTypeSection() {
    return `
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
            value="Kurly Only"
          />
          <label class="filter-panel__category-name" for="type-1">
            Kurly Only
            <p class="category-count">${this.products.filter(p => p.kurly_only).length}</p>
          </label>
        </div>
      </details>
    `;
  }

  updateCount(details) {
    const countSpan = details.querySelector('.header-count');
    const checkboxes = details.querySelectorAll('.filter-panel__category-input:checked, .filter-panel__category-radio:checked');
    countSpan.textContent = checkboxes.length;
  }

  updateCountEvent() {
    const inputs = this.shadowRoot.querySelectorAll('.filter-panel__category-input, .filter-panel__category-radio');
    inputs.forEach(input => {
      input.addEventListener('change', () => {
        const parentDetails = input.closest('.filter-panel__category-list');
        this.updateCount(parentDetails);
        this.dispatchFilterChangeEvent();
      });
    });
  }

  reset() {
    const resetButton = this.shadowRoot.querySelector('.filter-panel__reset');
    resetButton.addEventListener('click', () => {
      const allInputs = this.shadowRoot.querySelectorAll('.filter-panel__category-input, .filter-panel__category-radio');
      allInputs.forEach(input => input.checked = false);
      const allCounts = this.shadowRoot.querySelectorAll('.header-count');
      allCounts.forEach(countSpan => countSpan.textContent = '0');
      this.dispatchFilterChangeEvent();
    });
  }

  dispatchFilterChangeEvent() {
    const filterState = this.getFilterState();
    const event = new CustomEvent('filterchange', { detail: filterState });
    this.dispatchEvent(event);
  }

  getFilterState() {
    const filterState = {
      category: [],
      brand: [],
      delivery: [],
      price: null,
      benefits: [],
      type: []
    };

    const inputs = this.shadowRoot.querySelectorAll('.filter-panel__category-input:checked, .filter-panel__category-radio:checked');
    inputs.forEach(input => {
      const name = input.name;
      const value = input.value;
      if (name === 'price') {
        filterState[name] = value;
      } else {
        filterState[name].push(value);
      }
    });

    return filterState;
  }

  initialize() {
    this.updateCountEvent();
    this.reset();
  }
}