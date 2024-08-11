const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

const modalContainer = document.querySelector('.img-upload');
const imageControlSmaller = modalContainer.querySelector('.scale__control--smaller');
const imageControlBigger = modalContainer.querySelector('.scale__control--bigger');
const scaleImageInput = modalContainer.querySelector('.scale__control--value');
const previewImage = modalContainer.querySelector('.img-upload__preview img');


const scaleImage = (value) => {
  previewImage.style.transform = `scale(${value / 100})`;
  scaleImageInput.value = `${value }%`;
};

const onSmallerButtonClick = () => {
  scaleImage(
    Math.max(parseInt(scaleImageInput.value, 10) - SCALE_STEP, MIN_SCALE)
  );
};

const onBiggerButtonClick = () => {
  scaleImage(
    Math.min(parseInt(scaleImageInput.value, 10) + SCALE_STEP, MAX_SCALE)
  );
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

imageControlSmaller.addEventListener('click', onSmallerButtonClick);
imageControlBigger.addEventListener('click', onBiggerButtonClick);

export {resetScale};
