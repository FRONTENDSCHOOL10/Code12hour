import './product-list.scss';
import { defineCustomElements } from '@/utils/index';
import { CartButton, footer, header, SideFilter, headerSmall } from '@/components/index';
import { pb, getImageUrl } from '@/api/index';

const init = () => {
  defineCustomElements([
    ['c-header', header],
    ['c-header-small', headerSmall],
    ['c-footer', footer],
    ['c-cart', CartButton],
    ['c-sidebar', SideFilter],
  ]);
};

/* 콘솔 에러를 막기 위한 로딩 함수 */
let isLoading = false;
const setLoading = (loading) => (isLoading = loading);

/* 필터 함수 (어떻게 정렬할 것인지) */
const filterDatas = async (filter = 'recent', page = 1, perPage = 15) => {
  let sort = '';
  switch (filter) {
    case 'recent':
      sort = '-created';
      break;
    case 'sales':
      sort = '-sales_count';
      break;
    case 'discount':
      sort = '-discount_rate';
      break;
    case 'lowPrice':
      sort = 'product_price';
      break;
    case 'highPrice':
      sort = '-product_price';
      break;
    default:
      sort = '-created'; // 기본정렬: 신상품
  }

  return await pb.collection('product').getList(page, perPage, {
    sort: sort,
  });
};

/* 상품 Card 생성 함수 */
const createProductCard = (product) => {
  const discountedPrice = Math.floor(product.product_price * (1 - product.discount_rate / 100));
  const imageUrl = getImageUrl(product);

  const discountRateHtml =
    product.discount_rate > 0
      ? `<span class="product-item__discount-rate">${product.discount_rate}%<span class="sr-only">할인</span></span>`
      : '';

  const priceHtml =
    product.discount_rate > 0
      ? `<p class="product-item__price"><span class="sr-only">정가</span>${product.product_price.toLocaleString()}원</p>`
      : '';

  // 리뷰 수 처리
  let reviewCountText = '';
  if (product.review_count >= 9999) reviewCountText = '9,999+';
  if (product.review_count >= 999) reviewCountText = '999+';
  else reviewCountText = product.review_count;

  // 한정수량 이벤트에 해당하는지
  const eventProduct = product.event_product
    ? `<span class="product-item__limited">한정수량</span>`
    : '';

  // kurly only 상품
  const kurlyOnly = product.kurly_only
    ? `<span class="product-item__kurly-only">Kurly Only</span>`
    : '';

  return `
    <div class="product-item">
      <a
        class="product-item__link"
        href="/src/pages/product-detail/?id=${product.id}"
        tabindex="0"
        aria-label="${product.product_name} 상품 페이지로 이동"
      >
        <div class="product-item__img" role="img" aria-label="${product.product_name}" style="background-image: url(${imageUrl})"></div>
        <p class="product-item__delivery">샛별배송</p>
        <p class="product-item__title">${product.product_name}</p>
        <p class="product-item__description">${product.product_description}</p>
        ${priceHtml}
        <p class="product-item__real-price">
          ${discountRateHtml}
          <span class="sr-only">구매가</span>${discountedPrice.toLocaleString()}원
        </p>
        <p class="product-item__reviews"><span class="sr-only">리뷰 수</span>${reviewCountText}</p>
        ${kurlyOnly}
        ${eventProduct}
      </a>
      <c-cart
        data-product-id="${product.id}"
        data-product-image="${imageUrl}"
        data-product-name="${product.product_name}"
        data-product-price="${product.product_price}"
        data-discounted-price="${discountedPrice}"
      ></c-cart>
    </div>
  `;
};

/* 상품 Card 렌더링 함수 */
const renderProductList = async (filter = 'recommend', page = 1, perPage = 15) => {
  try {
    setLoading(true);

    const productsData = await filterDatas(filter, page, perPage);
    const productCount = productsData.totalItems;

    const countText = document.querySelector('.product-filter__count');
    countText.textContent = `총 ${productCount}건`; // 총 상품이 몇 개인지

    const itemGroup = document.querySelector('.product-item-group');
    itemGroup.innerHTML = ''; // 기존 상품 목록 초기화

    productsData.items.forEach((product) => {
      const template = createProductCard(product);
      itemGroup.insertAdjacentHTML('beforeend', template);
    });

    // 필터링된 데이터로 페이지네이션 업데이트함
    updatePagination(productCount, perPage, page, filter);
  } catch (e) {
    console.error('Error : ', e);
  } finally {
    setLoading(false);
  }
};

/* 페이지네이션 업데이트 함수 */
const updatePagination = (totalItems, itemsPerPage, currentPage, filter) => {
  const numbers = document.querySelector('.numbers');
  numbers.innerHTML = ''; // 기존 페이지네이션 초기화
  const pageCount = Math.ceil(totalItems / itemsPerPage); // 페이지네이션 개수

  // a 태그 페이지네이션 생성
  for (let i = 1; i <= pageCount; i++) {
    numbers.innerHTML += `<li><a class="pagination__link" href="#">${i}</a></li>`;
  }

  const numberButton = numbers.querySelectorAll('.pagination__link');

  const handlePageClick = async (e, index) => {
    e.preventDefault();
    if (isLoading) return; // 이미 로딩 중이면 클릭 무시
    await renderProductList(filter, index + 1, itemsPerPage);
  };

  // 클래스 추가 삭제 및 aria-current 제어
  numberButton.forEach((item, index) => {
    item.addEventListener('click', (e) => handlePageClick(e, index));
    if (index + 1 === currentPage) {
      item.classList.add('pagination__link--is-selected');
      item.setAttribute('aria-current', 'page');
    } else {
      item.classList.remove('pagination__link--is-selected');
      item.removeAttribute('aria-current');
    }
  });

  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    // 기존 이벤트 리스너 제거
    button.removeEventListener('click', button._listener);

    // 새 이벤트 리스너 정의
    button._listener = async () => {
      if (isLoading) return; // 이미 로딩 중이면 클릭 무시

      if (button.classList.contains('first-prev-button'))
        await renderProductList(filter, 1, itemsPerPage);

      if (button.classList.contains('second-prev-button')) {
        if (currentPage > 1) {
          await renderProductList(filter, currentPage - 1, itemsPerPage);
        }
      }

      if (button.classList.contains('next-button')) {
        if (currentPage < pageCount) {
          await renderProductList(filter, currentPage + 1, itemsPerPage);
        }
      }

      if (button.classList.contains('last-next-button'))
        await renderProductList(filter, pageCount, itemsPerPage);
    };

    // 새 이벤트 리스너 추가
    button.addEventListener('click', button._listener);
  });
};

/* 필터 버튼 클릭 시 이벤트 처리 */
const clickFilterButton = document.querySelectorAll('.product-filter__button');
const handleClickFilter = async (e) => {
  if (isLoading) return; // 이미 로딩 중이면 클릭 무시

  // 버튼 텍스트에 따라 필터 적용함
  const filterMap = {
    신상품순: 'recent',
    판매량순: 'sales',
    혜택순: 'discount',
    '낮은 가격순': 'lowPrice',
    '높은 가격순': 'highPrice',
  };

  const isActive = document.querySelector('.product-filter__button--is-active');
  if (isActive) isActive.classList.remove('product-filter__button--is-active');
  e.target.classList.add('product-filter__button--is-active');

  const filter = filterMap[e.target.textContent];
  await renderProductList(filter);
};
clickFilterButton.forEach((button) => {
  button.addEventListener('click', async (e) => handleClickFilter(e));
});

/* 상품 Card 렌더링 함수 실행 */
(async () => {
  await renderProductList('recent');
})();

init();
