import './product-detail.scss';
import { defineCustomElements } from '/utils/index';
import { footer, header } from '/components/index';

// const app = document.getElementById('app');

const init = () => {
  defineCustomElements([
    ['c-header', header],
    ['c-footer', footer],
  ]);

  // appendCustomElement(app, 'c-header');
  // appendCustomElement(app, 'c-footer');
};

init();
