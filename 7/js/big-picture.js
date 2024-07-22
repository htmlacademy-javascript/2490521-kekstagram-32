import { isEscapeKey } from './util.js';
import { similarPosts } from './pictures.js';


const bigPictureModule = document.querySelector('.big-picture');
const userPictures = document.querySelector('.pictures');
const mainPictureOfTheModal = bigPictureModule.querySelector('.big-picture__img img');
const closeBigPicture = bigPictureModule.querySelector('.big-picture__cancel');
const likesCount = bigPictureModule.querySelector('.likes-count');
const commentShownCount = bigPictureModule.querySelector('.social__comment-shown-count');
const socialCaption = bigPictureModule.querySelector('.social__caption');
const socialCommentCount = bigPictureModule.querySelector('.social__comment-count');
const commentLoader = bigPictureModule.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const commentItemTemplate = commentsList.querySelector('.social__comment');

const createComments = (comments) => {
  commentsList.innerHTML = '';
  comments.forEach(({commentAvatar, commentName, commentMessage}) => {
    const commentElement = commentItemTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = commentAvatar;
    commentElement.querySelector('.social__picture').alt = commentName;
    commentElement.querySelector('.social__text').textContent = commentMessage;
    commentsList.appendChild(commentElement);
  });
};

function onThumbnailClick (evt) {
  if (evt.target.closest('.picture')) {
    const targetPicture = evt.target.closest('.picture');
    mainPictureOfTheModal.src = targetPicture.querySelector('.picture__img').src;
    likesCount.textContent = targetPicture.querySelector('.picture__likes').textContent;
    commentShownCount.textContent = targetPicture.querySelector('.picture__comments').textContent;
    socialCaption.textContent = targetPicture.querySelector('.picture__img').alt;
    const comments = similarPosts[targetPicture.dataset.id - 1].comments;
    createComments(comments);
  }
}

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
  socialCommentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
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

