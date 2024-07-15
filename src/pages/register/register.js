import './register.scss';

import { defineCustomElements } from '@/utils/index';
import { footer, header } from '@/components/index';
import { setupUsernameValidation } from './username-validation';
import { setupPasswordValidation, setupPasswordConfirmation } from './password-validation';
import { setupEmailValidation } from './email-validation';
import { setupAgreementCheckboxes } from './agreement-checkboxes';
import { setupSubmitButton } from './submit-button';
import { setupAddressSearch } from './address-search';

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

document.addEventListener('DOMContentLoaded', () => {
  init();
  setupUsernameValidation();
  setupPasswordValidation();
  setupPasswordConfirmation();
  setupEmailValidation();
  setupAgreementCheckboxes();
  setupSubmitButton();
  setupAddressSearch();
});
