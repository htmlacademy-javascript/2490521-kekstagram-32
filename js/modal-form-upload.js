import { isEscapeKey } from './util';
import { resetScale } from './scale-image.js';
import { resetValidate } from './validation-form.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const buttonCloseForm = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const uploadEffectLevel = document.querySelector('.img-upload__effect-level');
const previewImage = document.querySelector('.img-upload__preview img');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const effectLevelValue = document.querySelector('.effect-level__value');

const isElementFocused = () =>
  document.activeElement === hashtagInput ||
  document.activeElement === commentInput;

const onDocumenentKeydown = (evt) => {
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
  document.addEventListener('keydown', onDocumenentKeydown);
  uploadEffectLevel.classList.add('hidden');
};

function closeModalForm () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumenentKeydown);
  previewImage.style.filter = '';
  resetValidate();
  resetScale();
  hashtagInput.value = '';
  commentInput.value = '';
  clearEffectValue();
}

imgUploadInput.addEventListener('change', () => {
  openModalForm();
});

buttonCloseForm.addEventListener('click', closeModalForm);

export {closeModalForm, onDocumenentKeydown};
