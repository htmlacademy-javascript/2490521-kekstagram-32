import { isEscapeKey } from './util';
import { resetScale } from './scale-image.js';
import { resetValidate } from './validation-form.js';

const modalContainer = document.querySelector('.img-upload');
const imgUploadInput = modalContainer.querySelector('.img-upload__input');
const imgUploadOverlay = modalContainer.querySelector('.img-upload__overlay');
const buttonCloseForm = modalContainer.querySelector('.img-upload__cancel');
const hashtagInput = modalContainer.querySelector('.text__hashtags');
const commentInput = modalContainer.querySelector('.text__description');
const uploadEffectLevel = modalContainer.querySelector('.img-upload__effect-level');
const previewImage = modalContainer.querySelector('.img-upload__preview img');
const radioButtons = modalContainer.querySelectorAll('input[type="radio"]');
const effectLevelValue = modalContainer.querySelector('.effect-level__value');

const isElementFocused = () =>
  document.activeElement === hashtagInput ||
  document.activeElement === commentInput;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey && !isElementFocused()) {
    evt.preventDefault();
    closeModalForm();
  }
};

const clearEffectValue = () => {
  radioButtons[0].checked = true;
  effectLevelValue.value = 0;
};

const openModalForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadEffectLevel.classList.add('hidden');
};

function closeModalForm () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  previewImage.style.filter = '';
  resetValidate();
  resetScale();
  hashtagInput.value = '';
  commentInput.value = '';
  clearEffectValue();
  imgUploadInput.value = '';
}

imgUploadInput.addEventListener('change', () => {
  openModalForm();
});

buttonCloseForm.addEventListener('click', closeModalForm);

export {closeModalForm, onDocumentKeydown};
