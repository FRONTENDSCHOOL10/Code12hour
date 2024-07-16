import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import './main.scss';
import { defineCustomElements } from '@/utils/index';
import { footer, header, headerSmall, AdPopup, Sidebar, CartButton } from '@/components/index';
import { pb, getImageUrl } from '@/api/index';

// 사용자 정의 커스텀 요소 목록 정의
const CUSTOM_ELEMENTS = [
  ['c-header', header],
  ['c-header-small', headerSmall],
  ['c-footer', footer],
  ['c-popup', AdPopup],
  ['c-sidebar', Sidebar],
  ['c-cart', CartButton],
];

// Swiper 옵션을 생성하는 함수
const createSwiperOptions = (type) =>
  ({
    mainBanner: {
      autoplay: { delay: 2000 },
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
    },
    productList: (listType) => ({
      slidesPerView: 4,
      slidesPerGroup: 4,
      speed: 300,
      spaceBetween: 18,
      navigation: {
        nextEl: `#${listType}-next`,
        prevEl: `#${listType}-prev`,
        disabledClass: 'swiper-button-hidden',
      },
      a11y: {
        prevSlideMessage: '이전 목록',
        nextSlideMessage: '다음 목록',
      },
    }),
  })[type];

// Swiper 인스턴스를 생성하는 함수
const createSwiper = (selector, options) => new Swiper(selector, options);

// 사용자 정의 커스텀 요소를 초기화하는 함수
const initCustomElements = (elements) => defineCustomElements(elements);

// 상품 카드 HTML을 생성하는 함수
const createProductCard = (product) => {
  const discountedPrice = Math.floor(product.product_price * (1 - product.discount_rate / 100));
  const imageUrl = getImageUrl(product);

  const discountRateHtml =
    product.discount_rate > 0
      ? `<span class="product-item__discount-rate">${product.discount_rate}%<span class="sr-only">할인</span></span>`
      : '';

  const productPriceHtml =
    product.discount_rate > 0 ? `${product.product_price.toLocaleString()}원` : '&nbsp';

  const priceClass =
    product.discount_rate > 0
      ? 'product-item__price product-item__price--discounted'
      : 'product-item__price';

  return `
    <div class="swiper-slide">
      <div class="product-item">
        <a
          class="product-item__link"
          href="/src/pages/product-detail/?id=${product.id}"
          tabindex="0"
          aria-label="${product.product_name} 상품 페이지로 이동"
        >
          <div class="product-item__img" role="img" aria-label="${product.product_name}" style="background-image: url(${imageUrl})"></div>
          <p class="product-item__title">${product.product_name}</p>
          <p class="${priceClass}"><span class="sr-only">정가</span>${productPriceHtml}</p>
          <p class="product-item__real-price">
            ${discountRateHtml}
            <span class="sr-only">구매가</span>${discountedPrice.toLocaleString()}원
          </p>
          <p class="product-item__reviews"><span class="sr-only">리뷰 수</span>${product.review_count}+</p>
        </a>
        <c-cart
          data-product-id="${product.id}"
          data-product-image="${imageUrl}"
          data-product-name="${product.product_name}"
          data-product-price="${product.product_price}"
          data-discounted-price="${discountedPrice}"
        ></c-cart>
      </div>
    </div>
  `;
};

// '전체보기' 카드 HTML을 생성하는 함수
const createViewAllCard = () => {
  return `
  <div class="swiper-slide">
    <div class="product-item__view-all">
      <a
        class="product-item__link"
        href="/src/pages/product-detail/"
        tabindex="0"
        aria-label="상품 페이지로 이동"
      >
        <img src="/assets/icons/arrow/view-all.svg" alt="전체보기" />
        <p>전체보기</p>
      </a>
    </div>
  </div>
`;
};

// 제품 목록을 렌더링하는 함수
const renderProductList = async (type) => {
  try {
    const sortOption = type === 'recommended' ? '-sales_count' : '-discount_rate';
    let queryOptions = {
      sort: sortOption,
    };

    if (type !== 'recommended') {
      queryOptions.filter = 'discount_rate >= 10';
    }

    const productList = await pb.collection('product').getFullList(queryOptions);
    const swiperWrapper = document.querySelector(`#${type}-product-list-swiper .swiper-wrapper`);

    if (swiperWrapper) {
      const productCards = productList.map(createProductCard).join('');
      const viewAllCard = createViewAllCard();
      swiperWrapper.innerHTML = productCards + viewAllCard;

      createSwiper(`#${type}-product-list-swiper`, {
        ...createSwiperOptions('productList')(type),
        slidesPerView: 4,
        slidesPerGroup: 4,
      });
    }
  } catch (error) {
    console.error('상품 리스트 가져오기 실패', error);
  }
};

// 메인 배너 Swiper 초기화 함수
const initSwipers = () => {
  createSwiper('#main-banner-swiper', createSwiperOptions('mainBanner'));
};

// 최근 본 상품 로컬 스토리지에서 가져오는 함수
const getViewedProducts = () => {
  const viewedProducts = localStorage.getItem('viewedProducts');
  return viewedProducts ? JSON.parse(viewedProducts) : [];
};

// 최근 본 상품 로컬 스토리지에 저장하는 함수
const saveViewedProducts = (products) => {
  localStorage.setItem('viewedProducts', JSON.stringify(products));
};

// 기간이 24시간 지난 히스토리 삭제 하는 함수
const removeExpiredProducts = () => {
  const viewedProducts = getViewedProducts();
  const now = new Date().getTime();
  const updatedProducts = viewedProducts.filter((product) => now < product.expirationTime);
  saveViewedProducts(updatedProducts);
};

// 최근 본 상품 추가하는 로직
const addViewedProduct = (productId, productImage) => {
  removeExpiredProducts();
  const viewedProducts = getViewedProducts();
  const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;

  const updatedProducts = viewedProducts.filter((product) => product.id !== productId);
  updatedProducts.unshift({ id: productId, image: productImage, expirationTime });

  saveViewedProducts(updatedProducts);
  window.dispatchEvent(new CustomEvent('productViewed'));
};

// 제품 링크에 이벤트 리스너 추가
const addProductLinkListeners = () => {
  document.querySelectorAll('.product-item__link').forEach((link) => {
    link.addEventListener('click', function () {
      const productId = new URL(this.href).searchParams.get('id');
      const productImage = this.querySelector('.product-item__img')
        .style.backgroundImage.slice(4, -1)
        .replace(/"/g, '');
      addViewedProduct(productId, productImage);
    });
  });
};

// MutationObserver 설정 동적으로 추가된 제품 링크에도 이벤트 리스너를 추가하기 위함.
// Swiper로 인해 동적으로 생성되는 요소들에도 대응을 하기 위함.
const setupMutationObserver = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        addProductLinkListeners();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

// 최근 본 상품 기능 초기화
const initViewedProducts = () => {
  removeExpiredProducts();
  addProductLinkListeners();
  setupMutationObserver();
};

// 페이지 초기화 함수
const init = async () => {
  initCustomElements(CUSTOM_ELEMENTS);
  initSwipers();
  await renderProductList('recommended');
  await renderProductList('discount');
  initViewedProducts();
};

init();
