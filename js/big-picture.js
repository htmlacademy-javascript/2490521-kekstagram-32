import { isEscapeKey } from './util.js';
import { getSavedData } from './pictures.js';


const COMMENTS_START_NUMBER = 0;
const COMMENTS_STEP_COUNT = 5;

const bigPictureModule = document.querySelector('.big-picture');
const userPictures = document.querySelector('.pictures');
const mainPictureOfTheModal = bigPictureModule.querySelector('.big-picture__img img');
const bigPictureModuleCloseButton = bigPictureModule.querySelector('.big-picture__cancel');
const likesCount = bigPictureModule.querySelector('.likes-count');
const totalCommentsCount = bigPictureModule.querySelector('.social__comment-shown-count');
const socialCaption = bigPictureModule.querySelector('.social__caption');
const commentsLoader = bigPictureModule.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const commentItemTemplate = commentsList.querySelector('.social__comment');
const commentCount = bigPictureModule.querySelector('.social__comment-count');
let currentComments;

const createComments = (allComments) => {
  const newComments = allComments.splice(COMMENTS_START_NUMBER, COMMENTS_STEP_COUNT);
  newComments.forEach(({avatar, name, message}) => {
    const commentElement = commentItemTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentsList.appendChild(commentElement);
  });

};

const toggleCommentLoader = () => {
  if (currentComments.length === 0) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const renderCountComments = () => {
  commentCount.innerHTML = `${commentsList.querySelectorAll('.social__comment').length} из ${totalCommentsCount.textContent} комментариев`;
};


const renderComments = () => {
  createComments(currentComments);
  toggleCommentLoader();
  renderCountComments();
};


const renderModalInfo = (targetPicture) => {
  mainPictureOfTheModal.src = targetPicture.querySelector('.picture__img').src;
  likesCount.textContent = targetPicture.querySelector('.picture__likes').textContent;
  totalCommentsCount.textContent = targetPicture.querySelector('.picture__comments').textContent;
  socialCaption.textContent = targetPicture.querySelector('.picture__img').alt;
  const similarThumbnails = getSavedData();
  currentComments = similarThumbnails[targetPicture.dataset.id].comments.slice();
  renderComments();
};

commentsLoader.addEventListener('click', () => {
  renderComments();
});

const onUserModalEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const openUserModal = () => {
  bigPictureModule.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onUserModalEscKeydown);
  commentsList.innerHTML = '';
};

function closeUserModal () {
  bigPictureModule.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUserModalEscKeydown);

}

userPictures.addEventListener('click', (evt) => {
  const targetPicture = evt.target.closest('.picture');
  if (targetPicture) {
    openUserModal();
    renderModalInfo(targetPicture);
  }
});

bigPictureModuleCloseButton.addEventListener('click', () => {
  closeUserModal();
});

