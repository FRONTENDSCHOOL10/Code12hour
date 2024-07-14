import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import './main.scss';
import { defineCustomElements } from '@/utils/index';
import { footer, header, AdPopup } from '@/components/index';

// const app = document.getElementById('app');

const init = () => {
  defineCustomElements([
    ['c-header', header],
    ['c-footer', footer],
    ['c-popup', AdPopup],
  ]);

  // appendCustomElement(app, 'c-header');
  // appendCustomElement(app, 'c-footer');
};

const mainBannerSwiper = new Swiper('#main-banner-swiper', {
  autoplay: {
    delay: 2000,
  },
  loop: true,
  speed: 2000,

  navigation: {
    nextEl: '#banner-next',
    prevEl: '#banner-prev',
  },

  a11y: {
    prevSlideMessage: '이전 배너',
    nextSlideMessage: '다음 배너',
  },
});

const productListSwiper = (node, next, prev) => {
  new Swiper(node, {
    slidesPerView: 4,
    slidesPerGroup: 4,
    speed: 300,
    spaceBetween: 18,

    navigation: {
      nextEl: next,
      prevEl: prev,
      disabledClass: 'swiper-button-hidden',
    },

    a11y: {
      prevSlideMessage: '이전 목록',
      nextSlideMessage: '다음 목록',
    },
  });
};

productListSwiper('#recommended-product-list-swiper', '#recommended-next', '#recommended-prev');
productListSwiper('#discount-product-list-swiper', '#discount-next', '#discount-prev');
init();
