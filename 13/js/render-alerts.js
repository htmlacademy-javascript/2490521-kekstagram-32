import { isEscapeKey } from './util.js';
import { resetValidate } from './validation-form.js';
import { onDocumentKeydown } from './modal-form-upload.js';

const TIMER_DISPLAY_ERROR = 5000;

const uploadPictureError = document.querySelector('#error').content.querySelector('.error');
const uploadPictureErrorButton = document.querySelector('#error').content.querySelector('.error__button');
const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const successPopup = document.querySelector('#success').content.querySelector('.success');
const successPopupButton = successPopup.querySelector('.success__button');
const submitButton = document.querySelector('#upload-submit');

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const onWindowEventListener = (evt) => {
  if (evt.target === uploadPictureError) {
    uploadPictureError.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.removeEventListener('click', onWindowEventListener);
    document.addEventListener('keydown', onDocumentKeydown);
    resetValidate();
  }
  if (evt.target === successPopup) {
    successPopup.remove();
    resetValidate();
  }
};

function onPopupEscKeydown (evt) {
  if(isEscapeKey(evt)) {
    uploadPictureError.remove();
    successPopup.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.removeEventListener('click', onWindowEventListener);
    document.addEventListener('keydown', onDocumentKeydown);
    resetValidate();
  }
}

const showErrorPopup = () => {
  document.body.append(uploadPictureError);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onWindowEventListener);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadPictureErrorButton.addEventListener('click', () => {
    uploadPictureError.remove();
  });
};

const showSuccessPopup = () => {
  document.body.append(successPopup);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onWindowEventListener);
  successPopupButton.addEventListener('click', () => {
    successPopup.remove();
  });
};


const showDataError = () => {
  document.body.append(dataError);
  setTimeout(() => {
    dataError.remove();
  }, TIMER_DISPLAY_ERROR);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

export {showErrorPopup, showDataError, showSuccessPopup, blockSubmitButton, unblockSubmitButton};
