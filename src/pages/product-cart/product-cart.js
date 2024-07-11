import './product-cart.scss';
import { defineCustomElements } from '@/utils/index';
import { footer, header } from '@/components/index';

// const app = document.getElementById('app');

const init = () => {
  const cartCheckBoxTop = document.getElementById('cart-select-top');
  const cartCheckBoxBottom = document.getElementById('cart-select-bottom'); // cartCheckBoxBottom 변수 정의

  const accordion = document.querySelectorAll('.cart__category details');

  defineCustomElements([
    ['c-header', header],
    ['c-footer', footer],
  ]);

  const handleTopCheckBoxChange = () => {
    if (cartCheckBoxTop.checked) {
      cartCheckBoxBottom.checked = true;
    } else {
      cartCheckBoxBottom.checked = false;
    }
  };

  const handleBottomCheckBoxChange = () => {
    if (cartCheckBoxBottom.checked) {
      cartCheckBoxTop.checked = true;
    } else {
      cartCheckBoxTop.checked = false;
    }
  };

  const handleAccordionToggle = (detail) => {
    if (detail.open) {
      detail.querySelector('.cart__category__arrow-icon').classList.add('open');
    } else {
      detail.querySelector('.cart__category__arrow-icon').classList.remove('open');
    }
  };

  cartCheckBoxTop.addEventListener('change', handleTopCheckBoxChange);
  cartCheckBoxBottom.addEventListener('change', handleBottomCheckBoxChange);
  accordion.forEach((detail) => {
    detail.addEventListener('toggle', function () {
      handleAccordionToggle(this);
    });
  });
};

init();
