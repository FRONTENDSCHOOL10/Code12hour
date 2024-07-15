import './product-detail.scss';
import { defineCustomElements } from '@/utils/index';
import { footer, header, review } from '@/components/index';

// const app = document.getElementById('app');

const init = () => {
  defineCustomElements([
    ['c-header', header],
    ['c-footer', footer],
    ['c-review', review],
  ]);

  // appendCustomElement(app, 'c-header');
  // appendCustomElement(app, 'c-footer');
};

init();
