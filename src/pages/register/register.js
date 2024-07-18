import './register.scss';
import './add-options';
import pb from '@/api/pocketbase';
import { defineCustomElements } from '@/utils/index';
import { footer, header, headerSmall } from '@/components/index';
import { setupUsernameValidation } from './username-validation';
import { setupPasswordValidation, setupPasswordConfirmation } from './password-validation';
import { setupEmailValidation } from './email-validation';
import { setupAgreementCheckboxes } from './agreement-checkboxes';
import { setupSubmitButton } from './submit-button';
import { setupAddressSearch } from './address-search';
import { setupNameValidation } from './name-validation';
import { setupInviteValidation } from './invite-validation';

const init = () => {
  defineCustomElements([
    ['c-header', header],
    ['c-footer', footer],
    ['c-header-small', headerSmall],
  ]);
};

const initEventListeners = () => {
  document.querySelector('#modal__close')?.addEventListener('click', () => {
    document.querySelector('c-modal')?.close();
  });
};

const initializeApp = () => {
  init();
  initEventListeners();
  setupNameValidation();
  setupUsernameValidation(pb);
  setupPasswordValidation(pb);
  setupPasswordConfirmation(pb);
  setupEmailValidation(pb);
  setupAgreementCheckboxes();
  const inviteValidation = setupInviteValidation(pb);
  setupSubmitButton(pb, inviteValidation);
  setupAddressSearch(pb);
};

initializeApp();
