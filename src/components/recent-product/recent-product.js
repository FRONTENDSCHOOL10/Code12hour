import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import css from './recent-product.scss?inline';

const sidebarTemplate = document.createElement('template');
sidebarTemplate.innerHTML = `
    <style>${css}</style>
    <div class="sidebar-wrapper">
      <aside class="recent-products">
        <div class="swiper-button-prev" id="sidebar-prev" aria-label="이전" tabindex="0"></div>
        <p class="recent-products__title">최근 본 상품</p>
        <div class="swiper" id="sidebar-swiper">
          <div class="swiper-wrapper">
          </div>
        </div>
        <div class="swiper-button-next" id="sidebar-next" aria-label="다음" tabindex="0"></div>
      </aside>
    </div>
`;

export class Sidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(sidebarTemplate.content.cloneNode(true));
    this.swiper = null;
  }

  connectedCallback() {
    this.renderRecentProducts();
    this.initSidebarSwiper();
  }

  getViewedProducts() {
    const viewedProducts = localStorage.getItem('viewedProducts');
    return viewedProducts ? JSON.parse(viewedProducts) : [];
  }

  renderRecentProducts() {
    const viewedProducts = this.getViewedProducts();
    const sidebarWrapper = this.shadowRoot.querySelector('.sidebar-wrapper');
    const swiperWrapper = this.shadowRoot.querySelector('.swiper-wrapper');

    // 최근 본 상품이 없을 경우 최상위 부모 none 처리
    if (viewedProducts.length === 0 && sidebarWrapper) {
      sidebarWrapper.style.display = 'none';
      return;
    }

    // 최근 본 상품들을 HTML로 변환
    const productsHTML = viewedProducts
      .map(
        (product) => `
      <div class="swiper-slide">
        <a href="/src/pages/product-detail/?id=${product.id}" tabindex="0">
          <div class="recent-products__img" style="background-image: url(${product.image})" aria-label="${product.name || '상품 이미지'}"></div>
        </a>
      </div>
    `
      )
      .join('');

    swiperWrapper.innerHTML = productsHTML;
  }

  initSidebarSwiper() {
    if (this.swiper) {
      this.swiper.destroy();
    }

    this.swiper = new Swiper(this.shadowRoot.querySelector('#sidebar-swiper'), {
      direction: 'vertical',
      slidesPerView: 'auto',
      spaceBetween: 5,
      navigation: {
        nextEl: this.shadowRoot.querySelector('#sidebar-next'),
        prevEl: this.shadowRoot.querySelector('#sidebar-prev'),
      },
    });
  }

  // 새로운 상품이 추가되었을 때 사이드바를 업데이트하는 메서드
  updateSidebar() {
    this.renderRecentProducts();
    this.initSidebarSwiper();
  }
}
