import './product-cart.scss';
import { defineCustomElements } from '@/utils/index';
import { footer, header, headerSmall } from '@/components/index';
import { pb, getImageUrl } from '@/api/index';

// 사용자 정의 커스텀 요소 목록 정의
const CUSTOM_ELEMENTS = [
  ['c-header', header],
  ['c-footer', footer],
  ['c-header-small', headerSmall],
];

const initCustomElements = (elements) => defineCustomElements(elements);

const initEventListener = () => {
  const locationChange = document.querySelector('.cart-edit__location-change');
  locationChange?.addEventListener('click', handleChangeLocationModal);
};

// 아코디언 화살표 변경 하는 함수
const initAccordion = () => {
  const accordion = document.querySelectorAll('.cart__category details');

  const handleAccordionToggle = (detail) => {
    const arrowIcon = detail.querySelector('.cart__category__arrow-icon');
    arrowIcon.classList.toggle('open', detail.open);
  };

  accordion.forEach((detail) => {
    detail.addEventListener('toggle', function () {
      handleAccordionToggle(this);
    });
  });
};

// 장바구니에 담긴 상품 정보에 대한 데이터를 가져와 카테고리 별로 분류 후 렌더링
const renderCartItems = (productData) => {
  const categories = {
    refrigerated: [],
    frozen: [],
    'room-temperature': [],
  };

  // 상품을 카테고리별로 분류
  productData.forEach((product) => {
    const storageName = product.expand.storage.storage_name;
    if (storageName.includes('냉장')) {
      categories.refrigerated.push(product);
    } else if (storageName.includes('냉동')) {
      categories.frozen.push(product);
    } else {
      categories['room-temperature'].push(product);
    }
  });

  // 각 카테고리별로 상품 렌더링
  Object.entries(categories).forEach(([category, products]) => {
    const categoryContainer = document.querySelector(
      `[data-category="${category}"] .cart-category__product-list`
    );
    products.forEach((product) => {
      const productElement = createProductElement(product, category);
      categoryContainer.appendChild(productElement);
    });
  });
};

// 각 정보들에 대한 상품 HTML 생성 함수
const createProductElement = (product, category) => {
  const li = document.createElement('li');
  const productImage = getImageUrl(product);
  const discountedPrice = Math.floor(product.product_price * (1 - product.discount_rate / 100));
  const quantity = getQuantityByProductId(product.id);

  li.className = 'cart-product';
  li.dataset.productId = product.id; // 제품 ID를 데이터 속성으로 추가
  li.innerHTML = `
    <div class="cart-product__select">
      <input
        type="checkbox"
        id="product-selection-${category}-${product.id}"
        class="cart-product__select-input"
      />
      <label
        for="product-selection-${category}-${product.id}"
        class="cart-product__select-label"
      ></label>
    </div>
    <a href="/src/pages/product-detail/?id=${product.id}" class="cart-product__info">
      <img
        src="${productImage}"
        alt="${product.product_name}"
        class="cart-product__image"
      />
      <p class="cart-product__title">${product.product_name}</p>
    </a>
    <div class="cart-product__quantity">
      <button
        type="button"
        class="cart-product__quantity-btn cart-product__quantity-btn--minus"
        aria-label="상품 갯수 감소"
      ></button>
      <span class="cart-product__quantity-label sr-only">상품 갯수</span>
      <span class="cart-product__quantity-value">${quantity}</span>
      <button
        type="button"
        class="cart-product__quantity-btn cart-product__quantity-btn--plus"
        aria-label="상품 갯수 증가"
      ></button>
    </div>
    <div class="cart-product__price">
      <p class="cart-product__price-discounted">${(discountedPrice * quantity).toLocaleString()}원</p>
      <p class="cart-product__price-original">${(product.product_price * quantity).toLocaleString()}원</p>
    </div>
    <button
      type="button"
      class="cart-product__remove-btn"
      aria-label="장바구니 목록에서 삭제"
    ></button>
  `;

  // 수량 변경 버튼에 이벤트 리스너 추가
  const minusBtn = li.querySelector('.cart-product__quantity-btn--minus');
  const plusBtn = li.querySelector('.cart-product__quantity-btn--plus');
  const quantityValue = li.querySelector('.cart-product__quantity-value');

  minusBtn.addEventListener('click', () => updateQuantity(product, -1, quantityValue));
  plusBtn.addEventListener('click', () => updateQuantity(product, 1, quantityValue));

  return li;
};

// 가격 업데이트 및 장바구니 갯수 수량 로컬스토리지 업데이트 함수
const updateQuantity = (product, change, quantityElement) => {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const itemIndex = cartItems.findIndex((item) => item.productId === product.id);

  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity = Math.max(1, cartItems[itemIndex].quantity + change);
    quantityElement.textContent = cartItems[itemIndex].quantity;

    // 가격 업데이트
    const productElement = quantityElement.closest('.cart-product');
    updatePrice(product, productElement, cartItems[itemIndex].quantity);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // 총 금액 업데이트
    updateTotalPrice();
  }
};

// 가격 UI 업데이트 함수
const updatePrice = (product, productElement, quantity) => {
  const discountedPriceElement = productElement.querySelector('.cart-product__price-discounted');
  const originalPriceElement = productElement.querySelector('.cart-product__price-original');
  const discountedPrice = Math.floor(product.product_price * (1 - product.discount_rate / 100));

  discountedPriceElement.textContent = `${(discountedPrice * quantity).toLocaleString()}원`;
  originalPriceElement.textContent = `${(product.product_price * quantity).toLocaleString()}원`;

  // 체크박스가 선택된 상태라면 총 금액 업데이트
  const checkbox = productElement.querySelector('.cart-product__select-input');
  if (checkbox.checked) {
    updateTotalPrice();
  }
};

// 선택한 상품들의 총합을 계산하여 업데이트
const updateTotalPrice = () => {
  let originalTotal = 0;
  let priceTotal = 0;

  const productCheckboxes = document.querySelectorAll('.cart-product__select-input');
  productCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const productElement = checkbox.closest('.cart-product');
      const originalPriceElement = productElement.querySelector('.cart-product__price-original');
      const discountedPriceElement = productElement.querySelector(
        '.cart-product__price-discounted'
      );

      const originalPrice = parseInt(originalPriceElement.textContent.replace(/[^0-9]/g, ''), 10);
      const discountedPrice = parseInt(
        discountedPriceElement.textContent.replace(/[^0-9]/g, ''),
        10
      );

      originalTotal += originalPrice;
      priceTotal += discountedPrice;
    }
  });

  const totalDiscount = originalTotal - priceTotal;

  const originPriceTotal = document.querySelector('.cart-edit__price-value');
  const discountPriceTotal = document.querySelector('.cart-edit__price-discount');
  const discountedPriceTotal = document.querySelector('.cart-edit__total-value');

  originPriceTotal.textContent = `${originalTotal.toLocaleString()}원`;
  discountPriceTotal.textContent = `- ${totalDiscount.toLocaleString()}원`;
  discountedPriceTotal.textContent =
    originalTotal === 0 ? '0원' : `${(priceTotal + 3000).toLocaleString()}원`;
};

// 특정 productId와 일치하는 객체의 quantity 값을 가져오는 함수
const getQuantityByProductId = (productId) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  const item = cartItems.find((item) => item.productId === productId);
  return item ? item.quantity : null; // 일치하는 객체가 없을 경우 null 반환
};

// 초기 선택 박스 업데이트
const initSelectTextUpdate = (cartItems) => {
  const selectTextElements = document.querySelectorAll('.cart-select-text');
  selectTextElements.forEach((element) => {
    element.textContent = `(0/${cartItems.length})`;
  });
};

// 장바구니 기능들 함수
const initCartFunctions = () => {
  const cartCheckBoxTop = document.getElementById('cart-select-top');
  const cartCheckBoxBottom = document.getElementById('cart-select-bottom');
  const selectTextElements = document.querySelectorAll('.cart-select-text');
  const deleteSelectedButtons = document.querySelectorAll('.cart-delete-selected');
  const detailsElements = document.querySelectorAll('.cart-category__details');
  let productCheckboxes = document.querySelectorAll('.cart-product__select-input');

  // 선택한 갯수 텍스트 업데이트 함수
  const updateSelectText = () => {
    const totalItems = productCheckboxes.length;
    const selectedItems = Array.from(productCheckboxes).filter(
      (checkbox) => checkbox.checked
    ).length;
    selectTextElements.forEach((element) => {
      element.textContent = `(${selectedItems}/${totalItems})`;
    });

    const allSelected = totalItems > 0 && selectedItems === totalItems;
    cartCheckBoxTop.checked = allSelected;
    cartCheckBoxBottom.checked = allSelected;
  };

  // 전체 선택 체크시 상단, 하단 전체 선택 체크와 동시에 각 상품 체크도 모드 checked로 변경
  const handleCheckBoxChange = (isTopCheckbox) => {
    const isChecked = isTopCheckbox ? cartCheckBoxTop.checked : cartCheckBoxBottom.checked;
    cartCheckBoxTop.checked = isChecked;
    cartCheckBoxBottom.checked = isChecked;
    productCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
    updateSelectText();
    updateTotalPrice();
  };

  // 각 상품들의 체크박스가 변할때 마다 호출되며 모두 체크가 되면 상단, 하단 전체 선택도 체크 되도록 함
  const handleProductCheckboxChange = () => {
    const allChecked = Array.from(productCheckboxes).every((cb) => cb.checked);
    cartCheckBoxTop.checked = allChecked;
    cartCheckBoxBottom.checked = allChecked;
    updateSelectText();
    updateTotalPrice();
  };

  // 장바구니 삭제 후 UI 재렌더링 함수
  const updateCartUI = () => {
    productCheckboxes = document.querySelectorAll('.cart-product__select-input');
    updateSelectText();
    handleProductCheckboxChange();
    updateTotalPrice();
  };

  // 선택된 체크박스들을 filter로 거른뒤 근처 cart-product 요소를 찾아 데이터 속성 아이디를 가져온 뒤
  // 해당 로컬에서 일치하는 아이디 값을 찾아서 삭제 및 요소 remove()
  const deleteSelectedItems = () => {
    const selectedProductIds = Array.from(productCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.closest('.cart-product').dataset.productId);

    if (selectedProductIds.length === 0) {
      alert('선택된 상품이 없습니다.');
      return;
    }

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter((item) => !selectedProductIds.includes(item.productId));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    selectedProductIds.forEach((productId) => {
      const productElement = document.querySelector(
        `.cart-product[data-product-id="${productId}"]`
      );
      if (productElement) {
        productElement.remove();
      }
    });

    updateCartUI();
  };

  // 초기 체크박스 상태 설정 및 details 요소 열기
  const initializeCartState = () => {
    // 모든 체크박스 선택
    cartCheckBoxTop.checked = true;
    cartCheckBoxBottom.checked = true;
    productCheckboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });

    // 내용이 있는 details 요소 열기
    detailsElements.forEach((details) => {
      if (details.querySelector('.cart-category__product-list').children.length > 0) {
        details.open = true;
      }
    });

    updateSelectText();
    updateTotalPrice();
  };

  cartCheckBoxTop.addEventListener('change', () => handleCheckBoxChange(true));
  cartCheckBoxBottom.addEventListener('change', () => handleCheckBoxChange(false));

  deleteSelectedButtons.forEach((button) => {
    button.addEventListener('click', deleteSelectedItems);
  });

  // 장바구니에 있는 상품들의 체크박스 모두 change 이벤트 리스너 생성
  productCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleProductCheckboxChange);
  });

  // 초기 상태 설정
  initializeCartState();
};

// 로그인 여부에 따른 배송지 UI 렌더링
const renderUserInfo = async () => {
  const { isAuth, user } = (await JSON.parse(localStorage.getItem('auth'))) || {};

  if (!isAuth) return;

  const locationHtml = `
    <div class="cart-edit__location-area">
      <div class="cart-edit__location-icon">
        <img src="/assets/icons/product-cart/Location.svg" alt="" aria-hidden="true" />
        <span class="cart-edit__location-text">배송지</span>
      </div>
      <p class="cart-edit__location-address">${user.address}</p>
      <span class="cart-edit__location-method">${user.morning_delivery ? '샛별배송' : '일반배송'}</span>
      <button class="cart-edit__location-change" type="button">배송지 변경</button>
    </div>
  `;

  const location = document.querySelector('.cart-edit__location');

  if (location) {
    location.insertAdjacentHTML('afterbegin', locationHtml);
  }
};

const handleChangeLocationModal = async () => {
  const { isAuth, user } = (await JSON.parse(localStorage.getItem('auth'))) || {};

  if (!isAuth) return;

  const modalContent = `
    <h2 slot="header" class="cart-modal-header">배송지 변경</h2>
    <h3 slot="header" class="cart-modal-sub-header">${user.address}</h3>
    <span slot="header" class="cart-modal-divider"></span>
    <input
      slot="body"
      class="modal__input"
      id="cart-modal__input"
      type="text"
      placeholder="등록할 주소를 입력 해주세요."
    />
    <div slot="footer" class="cart-modal-button-group">
      <button
        slot="footer"
        type="button"
        class="cart-modal__close"
        aria-label="배송지 등록 모달창 닫기"
      >
        닫기
      </button>
      <button
        slot="footer"
        class="cart-modal__address-change"
        type="button"
        aria-label="배송지 등록 하기"
      >
        등록하기
      </button>
    </div>
  `;
  const modal = document.querySelector('c-modal');
  modal.innerHTML = modalContent;
  modal.showModal();

  modal.querySelector('.cart-modal__close').addEventListener('click', () => modal.close());
  modal.querySelector('.cart-modal__address-change').addEventListener('click', () => {
    const inputField = modal.querySelector('#cart-modal__input').value;

    if (!inputField) {
      alert('새 주소를 입력해주세요.');
      return;
    }

    modal.close();
    setTimeout(() => {
      changeLocation(user, inputField);
    }, 500);
  });
};

const changeLocation = async (user, inputField) => {
  const updateLocalStorage = (updatedUser) => {
    const authData = JSON.parse(localStorage.getItem('auth'));
    if (authData && authData.user) {
      if (typeof updatedUser === 'object') {
        authData.user = { ...authData.user, ...updatedUser };
      } else {
        authData.user = { ...authData.user, address: updatedUser };
      }
      localStorage.setItem('auth', JSON.stringify(authData));
    }
  };

  const showAlertModal = (message) => {
    const modalContent = `
      <h2 slot="header" class="cart-alert-modal__title">알림</h2>
      <p slot="body" class="cart-alert-modal__body">${message}</p>
      <button
        slot="footer"
        type="button"
        class="cart-alert-modal__close"
        aria-label="알림 모달창 닫기"
      >
        닫기
      </button>
    `;

    const modal = document.querySelector('c-modal');
    modal.innerHTML = modalContent;
    modal.showModal();

    modal.querySelector('.cart-alert-modal__close').addEventListener('click', () => {
      modal.close();
      location.reload();
    });
  };

  try {
    const data = { address: inputField };
    // eslint-disable-next-line no-unused-vars
    const updatedRecord = await pb.collection('users').update(user.id, data);
    updateLocalStorage({ address: inputField });
    showAlertModal('주소가 성공적으로 변경되었습니다.');
  } catch (error) {
    console.error('주소 변경 중 오류 발생:', error.message);
  }

  // 실시간 주소 변경 구독
  const subscribeToAddressChanges = () => {
    pb.collection('users').subscribe(user.id, (e) => {
      if (e.record.address !== user.address) {
        updateLocalStorage({ address: e.record.address });
        user.address = e.record.address;
      }
    });
  };

  // 주소 변경 구독 시작
  subscribeToAddressChanges();
};

const init = async () => {
  initCustomElements(CUSTOM_ELEMENTS);
  initAccordion();
  await renderUserInfo();
  initEventListener();

  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  if (cartItems.length === 0) return;

  initSelectTextUpdate(cartItems);

  const productIds = cartItems.map((item) => item.productId);
  try {
    const productData = await Promise.all(
      productIds.map((item) =>
        pb.collection('product').getOne(item, {
          expand: 'storage',
        })
      )
    );

    renderCartItems(productData);
    initCartFunctions();
  } catch (error) {
    console.error('서버 통신 실패: product data:', error);
  }
};

init();
