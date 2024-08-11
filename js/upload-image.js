const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const modalContainer = document.querySelector('.img-upload');
const fileChooser = modalContainer.querySelector('.img-upload__start input[type=file]');
const preview = modalContainer.querySelector('.img-upload__preview img');
const previewEffects = modalContainer.querySelectorAll('.effects__preview');

const setEffectsPreview = () => {
  previewEffects.forEach((effect) => {
    effect.style.backgroundImage = `url('${preview.src}')`;
  });
};

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    setEffectsPreview();
  }
});
