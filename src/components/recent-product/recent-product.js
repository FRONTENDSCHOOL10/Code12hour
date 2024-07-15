import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import './recent-product.scss';
import css from './recent-product.scss?inline'; // css 파일 inline 가져오기 이렇게 하지 않으면 동적으로 css를 못넣음 빌드하면 파일 위치, 명이 다 바뀌기 때문

const sidebarTemplate = document.createElement('template');
sidebarTemplate.innerHTML = `
  <style>${css}</style>
  <div class="sidebar-wrapper">
      <aside class="recent-products">
        <div class="swiper-button-prev" id="sidebar-prev" aria-label="이전" tabindex="0"></div>
        <p class="recent-products__title">최근 본 상품</p>
        <div class="swiper" id="sidebar-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <a href="#" tabindex="0"
                ><div class="recent-products__img" aria-label="살얼음 동동 냉메밀 소바 2인분"></div
              ></a>
            </div>
            <div class="swiper-slide">
              <a href="#" tabindex="0"
                ><div class="recent-products__img" aria-label="살얼음 동동 냉메밀 소바 2인분"></div
              ></a>
            </div>
            <div class="swiper-slide">
              <a href="#" tabindex="0"
                ><div class="recent-products__img" aria-label="살얼음 동동 냉메밀 소바 2인분"></div
              ></a>
            </div>
            <div class="swiper-slide">
              <a href="#" tabindex="0"
                ><div class="recent-products__img" aria-label="살얼음 동동 냉메밀 소바 2인분"></div
              ></a>
            </div>
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
  }

  connectedCallback() {
    this.sidebarSwiper();
  }

  sidebarSwiper() {
    new Swiper(this.shadowRoot.querySelector('#sidebar-swiper'), {
      direction: 'vertical',
      slidesPerView: 'auto',
      spaceBetween: 3,

      navigation: {
        nextEl: this.shadowRoot.querySelector('#sidebar-next'),
        prevEl: this.shadowRoot.querySelector('#sidebar-prev'),
      },
    });
  }
}
