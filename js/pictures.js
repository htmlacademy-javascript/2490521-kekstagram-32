import {finalPosts} from './data.js';

const pictureList = document.querySelector('.pictures');
const pictureItemTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const semilarPosts = finalPosts();
const semilarPictureListFragment = document.createDocumentFragment();

semilarPosts.forEach(({post}) => {
  const pictureElement = pictureItemTemplate.cloneNode(true);
  pictureElement.querySelector('picture__img').src = post.url;
  pictureElement.querySelector('picture__img').alt = post.description;
  pictureElement.querySelector('picture__comments').textContent = post.comments.length;
  pictureElement.querySelector('picture__likes').textContent = post.likes;
  semilarPictureListFragment.append(pictureElement);
});

pictureList.append(semilarPictureListFragment);
