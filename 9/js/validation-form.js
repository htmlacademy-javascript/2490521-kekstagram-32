const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const uploadingModalForm = document.querySelector('.img-upload__form');
const pristine = new Pristine(uploadingModalForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});
let hashtagInputValueElements;

const createCorrectValue = (value) => {
  hashtagInputValueElements = value.trim().toLowerCase().split(' ').filter(Boolean);
};

const checkValidateHashtag = (value) => {
  createCorrectValue(value);
  const hashtagValid = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtagInputValueElements.every((hashtagItem) => hashtagItem.match(hashtagValid));
};

const checkHashtagsRepeat = () => {
  const uniqueHashtags = new Set();
  hashtagInputValueElements.forEach((element) => {
    uniqueHashtags.add(element);
  });
  return hashtagInputValueElements.length === uniqueHashtags.size;
};

const validateComment = (value) => value.length <= 140;

const checkHashtagsLength = (value) => {
  createCorrectValue(value);
  return hashtagInputValueElements.length <= 5;
};

pristine.addValidator(hashtagInput, checkHashtagsLength, 'Превышено количество хэштегов');
pristine.addValidator(hashtagInput, checkValidateHashtag, 'Введён невалидный хэштег');
pristine.addValidator(hashtagInput, checkHashtagsRepeat, 'Хэштеги повторяются');
pristine.addValidator(commentInput, validateComment, 'Длина комментария должна быть не более 140 символов');

uploadingModalForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.valide();
});
