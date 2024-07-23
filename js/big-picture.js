import { isEscapeKey } from './util.js';
import { similarPosts } from './pictures.js';

const COMMENTS_MIN_INDEX = 0;
const COMMENTS_MAX_INDEX = 5;

const bigPictureModule = document.querySelector('.big-picture');
const userPictures = document.querySelector('.pictures');
const mainPictureOfTheModal = bigPictureModule.querySelector('.big-picture__img img');
const closeBigPicture = bigPictureModule.querySelector('.big-picture__cancel');
const likesCount = bigPictureModule.querySelector('.likes-count');
const commentShownCount = bigPictureModule.querySelector('.social__comment-shown-count');
const socialCaption = bigPictureModule.querySelector('.social__caption');
const commentsLoader = bigPictureModule.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const commentItemTemplate = commentsList.querySelector('.social__comment');
const commentCount = bigPictureModule.querySelector('.social__comment-count');
let comments;

const createComments = (allComments) => {
  const newComments = allComments.splice(COMMENTS_MIN_INDEX, COMMENTS_MAX_INDEX);
  newComments.forEach(({commentAvatar, commentName, commentMessage}) => {
    const commentElement = commentItemTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = commentAvatar;
    commentElement.querySelector('.social__picture').alt = commentName;
    commentElement.querySelector('.social__text').textContent = commentMessage;
    commentsList.appendChild(commentElement);
  });
};

const hideCommentLoader = () => {
  if (comments.length === 0) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const totalCountComments = () => {
  commentCount.innerHTML = `${commentsList.querySelectorAll('.social__comment').length} из ${commentShownCount.textContent} комментариев`;
};

function onThumbnailClick (evt) {
  if (evt.target.closest('.picture')) {
    const targetPicture = evt.target.closest('.picture');
    mainPictureOfTheModal.src = targetPicture.querySelector('.picture__img').src;
    likesCount.textContent = targetPicture.querySelector('.picture__likes').textContent;
    commentShownCount.textContent = targetPicture.querySelector('.picture__comments').textContent;
    socialCaption.textContent = targetPicture.querySelector('.picture__img').alt;
    comments = similarPosts[targetPicture.dataset.id - 1].comments.slice();
    createComments(comments);
    hideCommentLoader();
    totalCountComments();
    return comments;
  }
}

commentsLoader.addEventListener('click', () => {
  createComments(comments);
  hideCommentLoader();
  totalCountComments();
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
  openUserModal();
  onThumbnailClick(evt);
});

closeBigPicture.addEventListener('click', () => {
  closeUserModal();
});

