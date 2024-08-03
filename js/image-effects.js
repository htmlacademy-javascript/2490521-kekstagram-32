const imageContainer = document.querySelector('.effect-level__slider');
const previewImage = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const uploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');


noUiSlider.create(imageContainer, {
  range: {
    min: 0,
    max: 100,
  },
  start: 20,
  step: 1,
  connect: 'lower',
});


effectsList.addEventListener('change', (evt) => {
  evt.preventDefault();
  const effectItem = evt.target.closest('.effects__item').querySelector('input[type="radio"]');
  uploadEffectLevel.classList.remove('hidden');
  if (effectItem.value === 'none') {
    imageContainer.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 20,
      step: 1,
    });
    previewImage.style.filter = '';
    uploadEffectLevel.classList.add('hidden');
  }
  if (effectItem.value === 'heat') {
    imageContainer.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 1.4,
    });
    imageContainer.noUiSlider.on('update', () => {
      previewImage.style.filter = `brightness(${imageContainer.noUiSlider.get()})`;
      effectLevelValue.value = imageContainer.noUiSlider.get();
    });
  }
  if (effectItem.value === 'phobos') {
    imageContainer.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
      start: 0.6,
    });
    imageContainer.noUiSlider.on('update', () => {
      previewImage.style.filter = `blur(${imageContainer.noUiSlider.get()}px)`;
      effectLevelValue.value = imageContainer.noUiSlider.get();
    });
  }
  if (effectItem.value === 'marvin') {
    imageContainer.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 20,
    });
    imageContainer.noUiSlider.on('update', () => {
      previewImage.style.filter = `invert(${imageContainer.noUiSlider.get()}%)`;
      effectLevelValue.value = imageContainer.noUiSlider.get();
    });
  }
  if (effectItem.value === 'sepia') {
    imageContainer.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 0.2,
    });
    imageContainer.noUiSlider.on('update', () => {
      previewImage.style.filter = `sepia(${imageContainer.noUiSlider.get()})`;
      effectLevelValue.value = imageContainer.noUiSlider.get();
    });
  }
  if (effectItem.value === 'chrome') {
    imageContainer.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 0.2,
    });
    imageContainer.noUiSlider.on('update', () => {
      previewImage.style.filter = `grayscale(${imageContainer.noUiSlider.get()})`;
      effectLevelValue.value = null;
    });
  }
});
