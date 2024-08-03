import { isEscapeKey } from './util.js';
import { resetValidate } from './validation-form.js';

const uploadPictureError = document.querySelector('#error').content.querySelector('.error');
const uploadPictureErrorButton = document.querySelector('#error').content.querySelector('.error__button');
const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const successPopup = document.querySelector('#success').content.querySelector('.success');
const successPopupButton = successPopup.querySelector('.success__button');

const onUserModalEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    uploadPictureError.remove();
    successPopup.remove();
  }
};

const showUploadPictureError = () => {
  document.body.append(uploadPictureError);
  document.addEventListener('keydown', (onUserModalEscKeydown));
};

function closeUploadPictureError () {
  uploadPictureErrorButton.addEventListener('click', () => {
    uploadPictureError.remove();
  });
  window.addEventListener('click', (evt) => {
    if (evt.target === uploadPictureError) {
      uploadPictureError.remove();
    }
  });
  resetValidate();
}

const showSuccessPopup = () => {
  document.body.append(successPopup);
  document.addEventListener('keydown', (onUserModalEscKeydown));
};

const closeSuccessPopup = () => {
  successPopupButton.addEventListener('click', () => {
    successPopup.remove();
  });
  window.addEventListener('click', (evt) => {
    if (evt.target === successPopup) {
      successPopup.remove();
    }
  });
};

const showDataError = () => {
  document.body.append(dataError);
  setTimeout(() => {
    dataError.remove();
  }, 5000);
};

export {showUploadPictureError, closeUploadPictureError, showDataError, showSuccessPopup, closeSuccessPopup};
