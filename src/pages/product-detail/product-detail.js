import './product-detail.scss';
import { defineCustomElements, cart, addToCart } from '@/utils/index';
import { footer, header, review, inquiry, headerSmall } from '@/components/index';
import { pb, getImageUrl } from '@/api/index';

// 사용자 정의 커스텀 요소 목록 정의
const CUSTOM_ELEMENTS = [
  ['c-header', header],
  ['c-header-small', headerSmall],
  ['c-footer', footer],
  ['c-review', review],
  ['c-inquiry', inquiry],
];

// 사용자 정의 커스텀 요소를 초기화하는 함수
const initCustomElements = (elements) => defineCustomElements(elements);

// 상품 상세 정보를 생성하고 관련 기능을 초기화하는 메인 함수
const createProductDetail = (product) => {
  const productImage = getImageUrl(product);
  const productWideImage = getImageUrl(product, 'product_wide_image');
  const product_detail_image = getImageUrl(product, 'product_detail_image');

  // 수량 관리를 위한 클로저를 생성하는 함수
  const createQuantityManager = (initialQuantity = 1) => {
    let quantity = initialQuantity;
    return {
      increment: () => quantity++,
      decrement: () => (quantity > 1 ? quantity-- : quantity),
      getQuantity: () => quantity,
    };
  };
  const quantityManager = createQuantityManager();

  // 할인된 가격을 계산하는 함수
  const getDiscountedPrice = (price, discountRate) => Math.floor(price * (1 - discountRate / 100));
  const discountedPrice = getDiscountedPrice(product.product_price, product.discount_rate);

  const calculateTotal = (price, quantity) => price * quantity;

  // UI 요소를 업데이트하는 함수
  const updateUI = (elements, quantity, price) => {
    const total = calculateTotal(price, quantity);
    elements.count.textContent = quantity;
    elements.optionTotal.textContent = `${total.toLocaleString()}원`;
    elements.totalAmount.textContent = total.toLocaleString();
  };

  // 수량 변경 핸들러를 생성하는 고차 함수
  const createQuantityHandler = (elements, price) => (increment) => () => {
    increment ? quantityManager.increment() : quantityManager.decrement();
    updateUI(elements, quantityManager.getQuantity(), price);
  };

  const productDetailHTML = `
    <section class="product-detail">
      <img
        src="${productImage}"
        alt="${product.product_name}"
        class="product-detail__image"
      />
      <div class="product-detail__info">
        <section class="product-detail__info-header">
          <span class="product-detail__delivery">샛별배송</span>
          <div class="product-detail__heading">
            <h1 class="product-detail__title">${product.product_name}</h1>
            <h2 class="product-detail__subtitle">${product.product_description}</h2>
          </div>
          <div class="product-detail__price">
            <div class="product-detail__price-ratio">
              ${product.discount_rate > 0 ? `<span class="product-detail__discount">${product.discount_rate}%</span>` : ''}
              <span class="product-detail__current-price">${Math.floor(product.product_price * (1 - product.discount_rate / 100)).toLocaleString()}</span>
              <span class="product-detail__currency">원</span>
            </div>
            ${
              product.discount_rate > 0
                ? `
              <div class="product-detail__original-price">
                <span class="product-detail__original-amount">${product.product_price.toLocaleString()}원</span>
                <button
                  class="product-detail__original-button"
                  type="button"
                  aria-label="가격 할인 정보"
                ></button>
              </div>
            `
                : ''
            }
          </div>
          <!-- <span class="product-detail__login-noti">로그인 후, 적립 혜택이 제공됩니다.</span> !-->
        </section>
        <section class="product-detail__info-mid">
          <dl class="product-detail__details-list">
            <dt class="product-detail__details-title">배송</dt>
            <dd class="product-detail__details-description">
              <span class="product-detail__delivery-method">샛별 배송</span>
              <span class="product-detail__delivery-info">
                23시 전 주문 시 내일 아침 7시 전 도착 <br />
                (대구 부산 울산 샛별배송 운영시간 별도 확인)
              </span>
            </dd>
          </dl>
          <dl class="product-detail__details-list">
            <dt class="product-detail__details-title">판매자</dt>
            <dd class="product-detail__details-description">
              <span class="product-detail__delivery-method">${product.saller_info}</span>
            </dd>
          </dl>
          <dl class="product-detail__details-list">
            <dt class="product-detail__details-title">포장타입</dt>
            <dd class="product-detail__details-description">
              <span class="product-detail__delivery-method">${product.packaging_type}</span>
              <span class="product-detail__delivery-info">
                택배배송은 에코 포장이 스트리폼으로 대체됩니다.
              </span>
            </dd>
          </dl>
          <dl class="product-detail__details-list">
            <dt class="product-detail__details-title">판매단위</dt>
            <dd class="product-detail__details-description">
              <span class="product-detail__delivery-method">${product.sales_unit}</span>
            </dd>
          </dl>
          <dl class="product-detail__details-list">
            <dt class="product-detail__details-title">중량/용량</dt>
            <dd class="product-detail__details-description">
              <span class="product-detail__delivery-method">${product.weight_volume}</span>
            </dd>
          </dl>
          <dl class="product-detail__details-list">
            <dt class="product-detail__details-title">원산지</dt>
            <dd class="product-detail__details-description">
              <span class="product-detail__delivery-method">${product.origin}</span>
            </dd>
          </dl>
          <dl class="product-detail__details-list">
            <dt class="product-detail__details-title">알레르기 정보</dt>
            <dd class="product-detail__details-description">
              <span class="product-detail__delivery-info">
                ${product.allergy_info.replace(/\n/g, '<br />')}
              </span>
            </dd>
          </dl>
        </section>
        <section class="product-detail__info-footer">
          <div class="product-detail__select-header">
            <span class="product-detail__select-title">상품선택</span>
            <div class="product-detail__option">
              <article class="product-detail__option-box">
                <span class="product-detail__option-name">${product.product_name}</span>
                <div class="product-detail__option-button">
                  <button
                    type="button"
                    class="product-detail__option-button--minus"
                    aria-label="상품 갯수 마이너스"
                  ></button>
                  <span for="product-detail__option-count" class="sr-only">상품 갯수</span>
                  <span class="product-detail__option-count">1</span>
                  <button
                    type="button"
                    class="product-detail__option-button--plus"
                    aria-label="상품 갯수 플러스"
                  ></button>
                </div>
                <span class="product-detail__option-total">${discountedPrice.toLocaleString()}원</span>
              </article>
            </div>
          </div>
          <div class="product-detail__total">
            <div class="product-detail__total-price">
              <span class="product-detail__total-text">총 상품금액:</span>
              <span class="product-detail__total-amount">${discountedPrice.toLocaleString()}</span>
              <span class="product-detail__total-unit">원</span>
            </div>
            <!--
            <div class="product-detail__benefits">
              <span class="product-detail__benefits-badge">적립</span>
              <span class="product-detail__benefits-noti">로그인 후, 적립 혜택 제공</span>
            </div> !-->
          </div>
          <div class="product-detail__cart">
            <button
              type="button"
              class="product-detail__cart-wishlist"
              aria-label="찜하기"
            ></button>
            <button
              type="button"
              class="product-detail__cart-bell"
              aria-label="알림 설정"
            ></button>
            <button type="button" class="product-detail__cart-add">장바구니 담기</button>
          </div>
        </section>
      </div>
    </section>
    <section class="product-navigation">
      <a
        href="#product-description"
        role="button"
        class="product-navigation__button product-navigation__button-is-active product-navigation__button--explain"
      >
        상품설명
      </a>
      <a
        href="#product-information"
        role="button"
        class="product-navigation__button product-navigation__button--detail"
      >
        상세정보
      </a>
      <a
        href="#product-review"
        role="button"
        class="product-navigation__button product-navigation__button--review"
      >
        후기<span class="product-navigation__review-count">(1,000)</span>
      </a>
      <a
        href="#product-inquiry"
        role="button"
        class="product-navigation__button product-navigation__button--inquiry"
      >
        문의
      </a>
    </section>
    <section class="product-description" id="product-description">
      <article class="product-intro">
        <img
          src="${productWideImage}"
          alt="${product.product_name}"
        />
        <div class="product-intro__text">
          <div class="product-intro__headline">
            <span class="product-intro__highlight">${product.product_description}</span>
            <span class="product-intro__title">${product.product_name}</span>
          </div>
          <p class="product-intro__body">
            ${product.product_detail_description}
          </p>
        </div>
      </article>
      <article class="product-point">
        <div class="product-point__headline">
          <div class="product-point__divider"></div>
          <div class="product-point__title">Karly's Check Point</div>
          <div class="product-point__divider"></div>
        </div>
        <figure>
          <img
            src="/assets/images/product-detail/product01-point.png"
            alt="칼리 체크 포인트 이미지"
          />
        </figure>
      </article>
    </section>
    <section class="product-information" id="product-information">
      <figure class="product-information__figure">
        <img
          src="${product_detail_image}"
          alt="상품 상세정보 이미지"
          class="product-information__image"
        />
      </figure>
      <article class="product-information__text">
        <h2 class="product-information__title">WHY KARYLY</h2>
        <ul class="product-information__card-list">
          <li class="product-information__card-item">
            <div class="product-information__card-head">
              <img src="/assets/icons/product-detail/Frame.svg" alt="체크리스트 아이콘" />
              <span>깐깐한 상품위원회</span>
            </div>
            <p>
              나와 내 가족이 먹고 쓸 상품을 고르는 마음으로 매주 상품을 직접 먹어보고,
              경험해보고 성분, 맛 안정성 등 다각도의 기준을 통과한 상품만을 판매합니다.
            </p>
          </li>
          <li class="product-information__card-item">
            <div class="product-information__card-head">
              <img src="/assets/icons/product-detail/Frame2.svg" alt="차별화된 상품 아이콘" />
              <span>차별화된 Karly Only 상품</span>
            </div>
            <p>
              전국 각지와 해외의 훌륭한 생산자가 믿고 선택하는 파트너, 마켓칼리. 3천여 개가 넘는
              칼리 단독 브랜드, 스펙의 Karly Only 상품을 믿고 만나보세요.
            </p>
          </li>
          <li class="product-information__card-item">
            <div class="product-information__card-head">
              <img src="/assets/icons/product-detail/Frame3.svg" alt="배송 아이콘" />
              <span>신선한 풀콜드체인 배송</span>
            </div>
            <p>
              온라인 업계 최초로 산지에서 문 앞까지 상온, 냉장, 냉동 상품을 분리 포장 후최적의
              온도를 유지하는 냉장 배송 시스템,풀콜드체인으로 상품을 신선하게 전해드립니다.
            </p>
          </li>
          <li class="product-information__card-item">
            <div class="product-information__card-head">
              <img src="/assets/icons/product-detail/Frame4.svg" alt="최저가 아이콘" />
              <span>고객, 생산자를 위한 최선의 가격</span>
            </div>
            <p>
              매주 대형 마트와 주요 온라인 마트의 가격변동 상황을 확인해 신선식품은
              품질을타협하지 않는 선에서 최선의 가격으로,가공식품은 언제나 합리적인 가격으로
              정기 조정합니다.
            </p>
          </li>
          <li class="product-information__card-item">
            <div class="product-information__card-head">
              <img src="/assets/icons/product-detail/Frame5.svg" alt="환경 아이콘" />
              <span>환경을 생각하는 지속 가능한 유통</span>
            </div>
            <p>
              친환경 포장재부터 생산자가 상품에만집중할 수 있는 직매입 유통구조까지,지속 가능한
              유통을 고민하며 컬리를 있게하는 모든 환경(생산자,커뮤니티,직원)이더 나아질 수
              있도록 노력합니다.
            </p>
          </li>
        </ul>
      </article>
    </section>
  `;

  return {
    html: productDetailHTML,
    // 수량 변경 핸들러를 초기화하는 함수
    initializeQuantityHandlers: () => {
      const elements = {
        count: document.querySelector('.product-detail__option-count'),
        optionTotal: document.querySelector('.product-detail__option-total'),
        totalAmount: document.querySelector('.product-detail__total-amount'),
        minusButton: document.querySelector('.product-detail__option-button--minus'),
        plusButton: document.querySelector('.product-detail__option-button--plus'),
      };

      const handleQuantity = createQuantityHandler(elements, discountedPrice);

      elements.minusButton.addEventListener('click', handleQuantity(false));
      elements.plusButton.addEventListener('click', handleQuantity(true));
    },
  };
};

// 상품 상세 정보를 렌더링하는 함수
const renderProductDetail = (productData) => {
  const productArticle = document.querySelector('.product');
  if (productArticle) {
    const { html, initializeQuantityHandlers } = createProductDetail(productData);
    productArticle.insertAdjacentHTML('afterbegin', html);
    initializeQuantityHandlers();
  } else {
    console.error('Product article not found');
  }
};

// 선택한 상품 장바구니에 담는 함수
const addProductCart = (product) => {
  const addCartButton = document.querySelector('.product-detail__cart-add');
  const productCount = document.querySelector('.product-detail__option-count');

  addCartButton.addEventListener('click', () => {
    const productId = product.id;
    const existingItemIndex = cart.findIndex((item) => item.productId === productId);

    if (existingItemIndex !== -1) {
      const updatedItem = { ...cart[existingItemIndex] };
      updatedItem.quantity += parseInt(productCount.textContent);
      cart[existingItemIndex] = updatedItem;
    } else {
      addToCart({ productId, quantity: parseInt(productCount.textContent) });
    }
    modalOpen();
  });

  const modalOpen = () => {
    const modal = document.querySelector('c-modal');
    const modalBody = document.querySelector('.modal-body');
    const modalClose = document.querySelector('.modal__close');
    const productImage = getImageUrl(product);

    modal.showModal();
    modalBody.innerHTML = `
      <h3 slot="header" class="modal-sub-header">${product.product_name}<span slot="body"> ${productCount.textContent}개</span></h3>
      <span slot="body" class="modal-divider"></span>
      <img slot="body" class="modal-image" src="${productImage}" alt="${product.product_name}"/>
    `;

    const closeModal = () => {
      modal.close();
    };

    modalClose.addEventListener('click', closeModal);

    const timerId = setTimeout(closeModal, 1200);

    const cancelAutoClose = () => {
      clearTimeout(timerId);
    };

    modalClose.addEventListener('click', cancelAutoClose);

    modal.addEventListener(
      'close',
      () => {
        modalClose.removeEventListener('click', closeModal);
        modalClose.removeEventListener('click', cancelAutoClose);
      },
      { once: true }
    );
  };
};

// 초기 실행 함수
const init = async () => {
  const params = new URLSearchParams(location.search);
  const productId = params.get('id');
  const productData = await pb.collection('product').getOne(productId);

  renderProductDetail(productData);
  addProductCart(productData);
  initCustomElements(CUSTOM_ELEMENTS);
};

init();
