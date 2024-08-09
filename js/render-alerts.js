import { isEscapeKey } from './util.js';
import { resetValidate } from './validation-form.js';
import { onDocumenentKeydown } from './modal-form-upload.js';

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

const onPopupEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    uploadPictureError.remove();
    successPopup.remove();
  }
};

const windowListener = (evt) => {
  if (evt.target === uploadPictureError) {
    uploadPictureError.remove();
  }
  if (evt.target === successPopup) {
    successPopup.remove();
  }
};

const showUploadPictureError = () => {
  document.body.append(uploadPictureError);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', windowListener);
  document.removeEventListener('keydown', onDocumenentKeydown);
};

function closeUploadPictureError () {
  uploadPictureErrorButton.addEventListener('click', () => {
    uploadPictureError.remove();

  });
  document.addEventListener('keydown', onDocumenentKeydown);///////////////////////////////////////////////////
  resetValidate();
}

const showSuccessPopup = () => {
  document.body.append(successPopup);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', windowListener);
};

const closeSuccessPopup = () => {
  successPopupButton.addEventListener('click', () => {
    successPopup.remove();
  });
};

const showDataError = () => {
  document.body.append(dataError);
  setTimeout(() => {
    dataError.remove();
  }, 5000);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

export {showUploadPictureError, closeUploadPictureError, showDataError, showSuccessPopup, closeSuccessPopup, blockSubmitButton, unblockSubmitButton};
