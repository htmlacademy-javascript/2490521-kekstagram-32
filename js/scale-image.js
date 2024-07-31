const imageControlSmaller = document.querySelector('.scale__control--smaller');
const imageControlBigger = document.querySelector('.scale__control--bigger');
const previewImage = document.querySelector('.img-upload__preview img');
const scaleImageInput = document.querySelector('.scale__control--value');

const scaleImage = (value) => {
  previewImage.style.transform = `scale(${value / 100})`;
  scaleImageInput.value = `${value }%`;
};

const onSmallerButtonClick = () => {
  scaleImage(
    Math.max(parseInt(scaleImageInput.value, 10) - 25, 25)
  );
};

const onBiggerButtonClick = () => {
  scaleImage(
    Math.min(parseInt(scaleImageInput.value, 10) + 25, 100)
  );
};

const resetScale = () => scaleImage(100);

imageControlSmaller.addEventListener('click', onSmallerButtonClick);
imageControlBigger.addEventListener('click', onBiggerButtonClick);

export {resetScale};
