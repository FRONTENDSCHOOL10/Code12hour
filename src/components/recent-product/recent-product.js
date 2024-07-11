import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import './recent-product.scss';

const sidebarSwiper = new Swiper('#sidebar-swiper', {
  direction: 'vertical',
  slidesPerView: 'auto',
  spaceBetween: 3,

  navigation: {
    nextEl: '#sidebar-next',
    prevEl: '#sidebar-prev',
  },
});
