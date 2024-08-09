const imageContainer = document.querySelector('.effect-level__slider');
const previewImage = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const uploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

const SliderOption = {
  CHROME: { range: { 'min': 0, 'max': 1 }, step: 0.1, start: 1 },
  SEPIA: { range: { 'min': 0,'max': 1 }, step: 0.1, start: 1 },
  MARVIN: { range: { 'min': 0, 'max': 100 }, step: 1, start: 100 },
  PHOBOS: { range: { 'min': 0, 'max': 3 }, step: 0.1, start: 3 },
  HEAT: { range: { 'min': 1, 'max': 3 }, step: 0.1, start: 3 },
  NONE: { range: { 'min': 0, 'max': 100 }, step: 1, start: 0 },
};


noUiSlider.create(imageContainer, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});


imageContainer.noUiSlider.on('update', () => {
  effectLevelValue.value = imageContainer.noUiSlider.get();
});

effectsList.addEventListener('change', (evt) => {
  evt.preventDefault();
  const effectItem = evt.target.closest('.effects__item').querySelector('input[type="radio"]');
  uploadEffectLevel.classList.remove('hidden');
  if (effectItem.value === 'none') {
    imageContainer.noUiSlider.updateOptions(SliderOption.NONE);
    previewImage.style.filter = '';
    uploadEffectLevel.classList.add('hidden');
  }
  if (effectItem.value === 'heat') {
    imageContainer.noUiSlider.updateOptions(SliderOption.HEAT);
    imageContainer.noUiSlider.on('update', () => {
      previewImage.style.filter = `brightness(${imageContainer.noUiSlider.get()})`;
    });
  }
  if (effectItem.value === 'phobos') {
    imageContainer.noUiSlider.updateOptions(SliderOption.PHOBOS);
    imageContainer.noUiSlider.on('update', () => {
      previewImage.style.filter = `blur(${imageContainer.noUiSlider.get()}px)`;
    });
  }
  if (effectItem.value === 'marvin') {
    imageContainer.noUiSlider.updateOptions(SliderOption.MARVIN);
    imageContainer.noUiSlider.on('update', () => {
      previewImage.style.filter = `invert(${imageContainer.noUiSlider.get()}%)`;
    });
  }
  if (effectItem.value === 'sepia') {
    imageContainer.noUiSlider.updateOptions(SliderOption.SEPIA);
    imageContainer.noUiSlider.on('update', () => {
      previewImage.style.filter = `sepia(${imageContainer.noUiSlider.get()})`;
    });
  }
  if (effectItem.value === 'chrome') {
    imageContainer.noUiSlider.updateOptions(SliderOption.CHROME);
    imageContainer.noUiSlider.on('update', () => {
      previewImage.style.filter = `grayscale(${imageContainer.noUiSlider.get()})`;
    });
  }
});
