import './delivery.scss';
import { defineCustomElements } from '@/utils/index';
import { footer, header, headerSmall } from '@/components/index';

const init = () => {
  defineCustomElements([
    ['c-header', header],
    ['c-header-small', headerSmall],
    ['c-footer', footer],
  ]);
};

init();