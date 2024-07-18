import './product-collection.scss';
import { defineCustomElements } from '@/utils/index';
import { CartButton, footer, header, headerSmall, Sidebar, SideFilter } from '@/components/index';
import { pb, getImageUrl } from '@/api/index';

(function () {
  const ITEMS_PER_PAGE = 15;
  const FILTER_MAP = {
    recent: '-created',
    best: '-sales_count',
    discount: '-discount_rate',
  };

  let isLoading = false;
  let initialCategory;
  let allProducts = [];

  const setLoading = (loading) => {
    isLoading = loading;
  };

  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'recent';
  };

  const fetchProducts = async (filter = 'recent') => {
    const sort = FILTER_MAP[filter] || FILTER_MAP.recent;
    return await pb.collection('product').getList(1, 1000, { sort });
  };

  const sortProducts = (products, additionalFilter) => {
    return products.sort((a, b) => {
      // 초기 정렬 기준에 따른 비교
      if (initialCategory === 'recent') {
        const dateA = new Date(a.created);
        const dateB = new Date(b.created);
        if (dateA.getTime() !== dateB.getTime()) {
          return dateB.getTime() - dateA.getTime();
        }
      } else if (initialCategory === 'best') {
        if (a.sales_count !== b.sales_count) {
          return b.sales_count - a.sales_count;
        }
      } else if (initialCategory === 'discount') {
        if (a.discount_rate !== b.discount_rate) {
          return b.discount_rate - a.discount_rate;
        }
      }

      // 초기 정렬 기준이 같은 경우, 추가 필터 적용
      if (additionalFilter === 'lowPrice') {
        return a.product_price - b.product_price;
      } else if (additionalFilter === 'highPrice') {
        return b.product_price - a.product_price;
      }

      // 모든 기준이 같으면 순서 유지
      return 0;
    });
  };

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

    const reviewCountText =
      product.review_count >= 9999
        ? '9,999+'
        : product.review_count >= 999
          ? '999+'
          : product.review_count;

    const eventProduct = product.event_product
      ? `<span class="product-item__limited">한정수량</span>`
      : '';

    const kurlyOnly = product.kurly_only
      ? `<span class="product-item__kurly-only">Karly Only</span>`
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
          <div class="price-group">
          ${priceHtml}
          <p class="product-item__real-price">
            ${discountRateHtml}
            <span class="sr-only">구매가</span>${discountedPrice.toLocaleString()}원
          </p>
        </div>
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

  const renderProductList = async (filter = 'recent', page = 1) => {
    try {
      setLoading(true);

      if (allProducts.length === 0) {
        const productsData = await fetchProducts(filter);
        allProducts = productsData.items;
      }

      const sortedProducts = sortProducts([...allProducts], filter);

      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const paginatedProducts = sortedProducts.slice(start, end);

      const productCount = allProducts.length;

      const countText = document.querySelector('.product-filter__count');
      const categoryTitle = document.querySelector('.product-header');
      const itemGroup = document.querySelector('.product-item-group');

      countText.textContent = `총 ${productCount}건`;
      categoryTitle.textContent =
        initialCategory === 'recent'
          ? '신상품'
          : initialCategory === 'best'
            ? '베스트'
            : initialCategory === 'discount'
              ? '알뜰쇼핑'
              : '';

      itemGroup.innerHTML = paginatedProducts.map(createProductCard).join('');

      updatePagination(productCount, ITEMS_PER_PAGE, page, filter);
      updateActiveFilter(filter);
    } catch (e) {
      console.error('Error : ', e);
    } finally {
      setLoading(false);
    }
  };

  const updatePagination = (totalItems, itemsPerPage, currentPage, filter) => {
    const pageCount = Math.ceil(totalItems / itemsPerPage);
    const numbers = document.querySelector('.numbers');
    numbers.innerHTML = Array.from(
      { length: pageCount },
      (_, i) => `<li><a class="pagination__link" href="#" data-page="${i + 1}">${i + 1}</a></li>`
    ).join('');

    const numberButtons = numbers.querySelectorAll('.pagination__link');

    numberButtons.forEach((item) => {
      const pageNum = parseInt(item.dataset.page);
      item.addEventListener('click', (e) => handlePageClick(e, pageNum, filter));
      item.classList.toggle('pagination__link--is-selected', pageNum === currentPage);
      item.toggleAttribute('aria-current', pageNum === currentPage);
    });

    setupPaginationButtons(currentPage, pageCount, filter);
  };

  const handlePageClick = async (e, pageNum, filter) => {
    e.preventDefault();
    if (isLoading) return;
    await renderProductList(filter, pageNum);
  };

  const setupPaginationButtons = (currentPage, pageCount, filter) => {
    const buttons = document.querySelectorAll('.pagination__button');
    buttons.forEach((button) => {
      button.removeEventListener('click', button._listener);
      button._listener = async () => {
        if (isLoading) return;

        let newPage;
        if (button.classList.contains('first-prev-button')) newPage = 1;
        else if (button.classList.contains('second-prev-button'))
          newPage = Math.max(1, currentPage - 1);
        else if (button.classList.contains('next-button'))
          newPage = Math.min(pageCount, currentPage + 1);
        else if (button.classList.contains('last-next-button')) newPage = pageCount;

        if (newPage !== currentPage) {
          await renderProductList(filter, newPage);
        }
      };
      button.addEventListener('click', button._listener);
    });
  };

  const handleClickFilter = async (e) => {
    if (isLoading) return;
    const filter = e.target.dataset.filter;
    if (filter) {
      await renderProductList(filter);
    }
  };

  const updateActiveFilter = (activeFilter) => {
    const filterButtons = document.querySelectorAll('.product-filter__button');
    filterButtons.forEach((button) => {
      button.classList.toggle(
        'product-filter__button--is-active',
        button.dataset.filter === activeFilter
      );
    });
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

  // 최근 본 상품 기능 초기화
  const initViewedProducts = () => {
    removeExpiredProducts();
    addProductLinkListeners();
  };

  const init = async () => {
    defineCustomElements([
      ['c-header', header],
      ['c-header-small', headerSmall],
      ['c-footer', footer],
      ['c-cart', CartButton],
      ['c-sidebar-category', SideFilter],
      ['c-sidebar', Sidebar],
    ]);

    const filterContainer = document.querySelector('.product-filter__list');
    filterContainer.addEventListener('click', handleClickFilter);

    initialCategory = getCategoryFromURL();
    await renderProductList(initialCategory);
    initViewedProducts();
  };

  init();
})();
